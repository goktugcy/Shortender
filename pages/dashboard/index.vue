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
              class="flex-[0.3] ml-3 btn text-lg px-2 rounded-xl"
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

    <div
      class="max-w-[1200px] px-6 w-full absolute top-14 right-1/2 -translate-x-1/3"
    >
      <TransitionGroup
        :duration="{ enter: 600, leave: 600 }"
        name="notification"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="card text-sm w-fit ml-auto mt-5"
        >
          {{ notification.message }}
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  middleware: ["auth"],
});

useAsyncData("links", async () => {
  const { data } = await client
    .from("links")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", user.value?.id ?? "");

  return data;
});

//--Form--//
const form = ref({
  url: "",
  key: "",
});

const notifications = ref<{ id: number; message: string }[]>([]);

function addNotification(message: string) {
  const id = notifications.value.length + 1;
  notifications.value = [{ id, message }, ...notifications.value];
  setTimeout(() => {
    notifications.value = notifications.value.filter(
      (n: { id: number }) => n.id !== id
    );
  }, 3000);
}

const handleForm = async () => {
  if (!form.value.key) {
    createShortKey();
  }
  if (!form.value.url) {
    addNotification("👎 Error: fill url first");
    return;
  }
  try {
    const { data, error } = await client.from("links").insert({
      ...form.value,
      user_id: user.value?.id,
    });

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

