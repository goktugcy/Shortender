<template>
  {{ data }}
</template>

<script lang="ts" setup>
import { Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();
// const user = useSupabaseUser();

const params = useRoute().params;

if (!params.id) {
  throw createError({
    statusCode: 404,
    message: "Not Fount",
  });
}

const { data } = await useAsyncData("links", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("key", params.id)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      message: "Not Fount",
    });
  }

  return data;
});
if (data.value?.url) {
  useExternalRedirect(data.value?.url);
}
</script>

<style scoped></style>
