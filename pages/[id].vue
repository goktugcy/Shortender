<template>
  <div class="flex justify-center items-center h-screen w-screen text-xl">
    <p v-if="error">{{ error }}</p>
    <p v-else>Redirecting...</p>
  </div>
</template>

<script lang="ts" setup>
import { type Database } from "~/types/supabase";
import useExternalRedirect from "~/composables/useExternalRedirect";

const client = useSupabaseClient<Database>();
const route = useRoute();
const error = ref<string | null>(null);

if (!route.params.id) {
  throw showError({
    status: 404,
    statusText: "Invalid URL",
    statusMessage: "This URL is invalid.",
  });
}

const { data } = await useAsyncData("links", async () => {
  const { data } = await client
    .from("links")
    .select("*")
    .eq("key", route.params.id)
    .single();

  return data;
});

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

if (data.value?.url) {
  if (isValidUrl(data.value.url)) {
    useExternalRedirect(data.value.url, data.value.id, 302);
  } else {
    throw showError({
      status: 404,
      statusText: "Invalid URL",
      statusMessage: "This URL is invalid.",
    });
  }
}

if (data.value?.status === false) {
  throw showError({
    status: 404,
    statusText: "Disabled URL",
    statusMessage: "This URL is disabled.",
  });
}
</script>
