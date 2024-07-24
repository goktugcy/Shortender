<template>
  {{ data }}
</template>

<script lang="ts" setup>
import { type Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();
// const user = useSupabaseUser();

const params = useRoute().params;

if (!params.id) {
  throw createError("Not Found");
}

const { data } = await useAsyncData("links", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("key", params.id)
    .single();

  if (error) {
    throw createError("Not Found");
  }

  return data;
});
if (data.value?.url) {
  useExternalRedirect(data.value?.url, "302");
}
</script>

<style scoped></style>
