import { sendRedirect } from "h3";
import { type Database } from "~/types/supabase";

export default async function useExternalRedirect(
  url: string,
  linkId: string,
  code: number = 302
): Promise<void> {
  const validUrlRegex = /^(https?:\/\/)/;
  if (!validUrlRegex.test(url)) {
    throw new Error("Invalid URL");
  }

  const nuxtApp = useNuxtApp();

  // Ensure that we have the SSR context
  if (process.server && nuxtApp.ssrContext?.event) {
    const { event } = nuxtApp.ssrContext;

    const headers = event.node.req.headers;
    const userAgent = headers["user-agent"] || null;
    const ip = (headers["x-real-ip"] || headers["x-forwarded-for"]) as
      | string
      | null;

    // Dynamically import geoip-lite only on the server side
    try {
      const geoip = await import("geoip-lite").then(
        (mod) => mod.default || mod
      );

      // Geolocation data
      const geo = geoip.lookup(ip || "");
      const city = geo?.city || null;
      const country = geo?.country || null;

      const client = useSupabaseClient<Database>();

      // Insert data into the clicks table
      const { error } = await client.from("clicks").insert({
        city,
        country,
        ip,
        user_agent: userAgent,
        link_id: linkId,
        deleted_at: null,
      });

      if (error) {
        console.error("Error inserting click data:", error);
        throw new Error("Failed to insert click data");
      }

      // Perform the redirect
      return nuxtApp.callHook("app:redirected").then(() => {
        return sendRedirect(event, url, code);
      });
    } catch (err) {
      console.error("Error during geoip lookup or Supabase interaction:", err);
      throw new Error("Server error during redirection process");
    }
  } else if (process.client) {
    // Client-side redirect
    window.location.href = url;
  }
}
