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

    const client = useSupabaseClient<Database>();

    try {
      const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const locationData = await locationResponse.json();

      const country = locationData.country || null;
      const city = locationData.city || null;
      const isp = locationData.isp || null;

      const { error: insertError } = await client.from("clicks").insert({
        ip: ip,
        link_id: linkId,
        city: city,
        country: country,
        user_agent: userAgent,
        isp: isp,
      });

      if (insertError) {
        throw new Error("Failed to insert click data");
      }

      const { data: clicksData, error: clicksError } = await client
        .from("links")
        .select("clicks")
        .eq("id", linkId)
        .single();

      if (clicksError) {
        throw new Error("Failed to fetch clicks count");
      }

      const clicksCount = clicksData ? clicksData.clicks : 0;

      const { error: updateError } = await client
        .from("links")
        .update({ clicks: (clicksCount ?? 0) + 1, updated_at: new Date() })
        .eq("id", linkId);

      if (updateError) {
        throw new Error("Failed to update clicks count");
      }

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
