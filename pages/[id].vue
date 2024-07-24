<template>
  <div class="flex justify-center items-center h-screen">
    <p>Redirecting...</p>
  </div>
</template>

<script lang="ts" setup>
import { type Database } from "~/types/supabase";
import useExternalRedirect from '~/composables/useExternalRedirect'

const client = useSupabaseClient<Database>();
const route = useRoute();

if (!route.params.id) {
  throw createError("Not Found");
}

const { data } = await useAsyncData("links", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("key", route.params.id)
    .single();

  if (error) {
    throw createError("Not Found");
  }

  return data;
});

if (data.value?.url) {
  useExternalRedirect(data.value.url, data.value.id, 302);
}
</script>

<style scoped></style>
