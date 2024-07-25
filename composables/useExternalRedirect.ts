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
    const country = headers["cf-ipcountry"] || null;
    const city = headers["cf-ipcity"] || null;

    const client = useSupabaseClient<Database>();

    try {
      // Insert click data into Supabase
      await client.from("clicks").insert({
        ip: ip,
        user_agent: userAgent,
        link_id: linkId,
        country: country as string,
        city: city as string,
      });

      const clicks = await client
        .from("links")
        .select("clicks")
        .eq("id", linkId);
      
      const clicksCount = clicks.data?.[0]?.clicks ?? 0;
      
      await client
        .from("links")
        .update({ clicks: clicksCount + 1 })
        .eq("id", linkId);

      // Perform the redirect
      await nuxtApp.callHook("app:redirected");
      return sendRedirect(event, url, code);
    } catch (err) {
      console.error("Error during Supabase interaction:", err);
      throw new Error("Server error during redirection process");
    }
  } else if (process.client) {
    window.location.href = url;
  }
}
