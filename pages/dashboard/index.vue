<template>
  <div>
    <section class="container pt-24 mb-10">
      <h1 class="text-3xl font-bold">Dashboard</h1>
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

    <section
      class="container mb-5 last:mb-0"
      v-for="item in data"
      :key="item.id"
    >
      <LinkItem :link="{ id: item.id, key: item.key, url: item.url }" />
    </section>

    <div class="max-w-[1200px] px-2 w-full absolute top-24 left-1/2 -translate-x-1/2">
      <Transition duration="600" name="notification">
        <div class="card text-lg w-fit ml-auto" v-if="isShowNotification">
          Error: fill url first!
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from "nanoid";
import { Database } from "types/supabase";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  middleware: ["auth"],
});

const { data, refresh } = useAsyncData("links", async () => {
  const { data } = await client
    .from("links")
    .select("*")
    .order("created_at", {ascending: false})
    .eq("user_id", user.value?.id);

  return data;
})

//--Form--//
const form = ref({
  url: "",
  key: "",
});
let isShowNotification = ref<boolean>(false);

const handleForm = async () => {
  if (!form.value.key) {
    createShortKey();
  }
  if (!form.value.url) {
    showNotification();
    return;
  }
  try {
    const { data, error } = await client.from("links").insert({
      ...form.value,
      user_id: user.value?.id,
    });

    if (error) console.error(error);

    await refresh();
    createShortKey();
    form.value.url = "";
  } catch (err) {
    console.error(err);
  }
};

const createShortKey = (len: number = 6): void => {
  form.value.key = nanoid(len);
};

const showNotification = () => {
  isShowNotification.value = true;
  setTimeout(() => (isShowNotification.value = false), 3500);
};

onMounted(() => {
  createShortKey();
});
</script>

<style scoped></style>
