<template>
  <div>
    <div
      class="card flex items-center justify-between m-4"
      v-for="link in links"
      :key="link.id"
    >
      <div>
        <div class="text-green-600 text-3xl">/{{ link.key }}</div>
        <div
          class="text-white/80 text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[400px]"
        >
          {{ link.url }}
        </div>
      </div>
      <UToggle
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        :model-value="true"
      />
      <button
        class="btn w-14 h-14 rounded-full grid place-content-center"
        @click="copyLink(link.key)"
      >
        <Transition name="link" mode="out-in">
          <template v-if="!isCopied">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </template>
        </Transition>
      </button>
      <button
        class="btn w-14 h-14 rounded-full grid place-content-center"
        @click="deleteLink(link.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
  <div
    class="max-w-[1200px] px-6 w-full absolute top-14 left-1/2 -translate-x-1/3"
  >
    <TransitionGroup :duration="{ enter: 600, leave: 600 }" name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="card text-sm w-fit ml-auto mt-5"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { type Database } from "~/types/supabase";

interface Link {
  id: string;
  key: string;
  url: string;
}

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  middleware: ["auth"],
});

const links = ref<Link[]>([]);

const fetchLinks = async () => {
  const { data, error } = await client.from("links").select("*");
  if (error) {
    console.error("Error fetching links:", error);
  } else {
    links.value = data.map((link: { id: any; key: any; url: any }) => ({
      id: link.id,
      key: link.key,
      url: link.url,
    }));
  }
};

onMounted(() => {
  fetchLinks();

  client
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "links" },
      (payload: any) => {
        console.log("Change received!", payload);
        fetchLinks();
      }
    )
    .subscribe();
});

watch(() => user.value?.id, fetchLinks, { immediate: true });

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

const config = useRuntimeConfig();

const isCopied = ref<boolean>(false);

const copyLink = (key: string) => {
  navigator.clipboard
    .writeText(`${config.public.appUrl}${key}`)
    .then(() => {
      isCopied.value = true;
      addNotification("Copied ⚡️");
      setTimeout(() => {
        isCopied.value = false;
      }, 3000);
    })
    .catch((err) => console.error("Copy failed", err));
};

const deleteLink = async (id: string) => {
  try {
    const { error } = await client.from("links").delete().eq("id", id).single();
    if (error) throw error;
    addNotification("Link deleted 🗑️");
    fetchLinks();
  } catch (error) {
    console.error(`Error deleting link with ID ${id}:`, error);
  }
};
</script>

<style scoped>
.link-enter-active,
.link-leave-active {
  opacity: 1;
  transition: all 0.1s ease;
}

.link-enter-from,
.link-leave-to {
  opacity: 0;
}
</style>
