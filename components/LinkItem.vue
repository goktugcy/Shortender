<template>
  <div class="container mx-auto p-4">
    <table class="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th
            class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Key
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            URL
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="link in links" :key="link.id" class="hover:bg-gray-700">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100"
          >
            /{{ link.key }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
            {{ link.url }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              @click="copyLink(link.key)"
              class="text-green-400 hover:text-green-300 mr-4"
            >
              Copy
            </button>
            <button
              @click="deleteLink(link.id)"
              class="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="notifications.length" class="fixed bottom-4 right-4 space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-gray-800 text-white p-3 rounded-lg shadow-md"
      >
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/supabase";

interface Link {
  id: string;
  key: string;
  url: string;
}

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

console.log("User:", user.value);

const links = ref<Link[]>([]);

const fetchLinks = async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id);
  if (error) {
    console.error("Error fetching links:", error);
  } else {
    links.value = data.map(
      (link: { id: string; key: string; url: string | null }) => ({
        id: link.id,
        key: link.key,
        url: link.url!,
      })
    );
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
  const id = Date.now();
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
    addNotification("Failed to delete link ❌");
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
