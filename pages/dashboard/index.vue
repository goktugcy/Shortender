<template>
  <div>
    <section class="container pt-14 mb-10 w-1/2">
      <div class="card mt-10">
        <form @submit.prevent="handleForm">
          <div class="flex justify-between gap-5">
            <input
              class="flex-1 py-3 px-3 rounded-xl"
              id="url"
              type="text"
              placeholder="Paste or enter long URL"
              v-model="form.url"
            />
            <input
              class="flex-[0.5] py-3 px-3 rounded-xl"
              id="shortKey"
              type="text"
              placeholder="Enter a key"
              v-model="form.key"
            />
            <button
              type="submit"
              class="gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
            >
              Short now!
            </button>
          </div>
        </form>
      </div>
    </section>

    <section class="container mb-5 last:mb-0 w-1/2">
      <LinkItem />
    </section>

    <NotificationManager />
  </div>
</template>

<script lang="ts" setup>
import { type Database } from "~/types/supabase";
import { useNotification } from "~/composables/useNotification";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { addNotification } = useNotification();

// definePageMeta({
//   middleware: ["auth"],
// });

//--Form--//
const form = ref({
  url: "",
  key: "",
});

const validUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const handleForm = async () => {
  if (!form.value.key) {
    createShortKey();
  }
  if (!form.value.url) {
    addNotification("👎 Error: fill url first");
    return;
  }

  if (!validUrl(form.value.url)) {
    addNotification("👎 Error: invalid url");
    return;
  }

  try {
    const { data, error } = await client.from("links").insert({
      ...form.value,
      user_id: user.value?.id,
    } as Database["public"]["Tables"]["links"]["Row"]);

    if (error && error.message.includes("duplicate key value")) {
      addNotification("👎 Error: key already exists");
      return;
    }

    if (error) console.error(error);
    addNotification("👍 Short link created!");
    createShortKey();
    form.value.url = "";
  } catch (err) {
    console.error(err);
  }
};

const createShortKey = (len: number = 6): void => {
  form.value.key = Math.random().toString(36).substr(2, len);
};

onMounted(() => {
  createShortKey();
});
</script>
