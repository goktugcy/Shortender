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
            Status
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
            <div>
              <UToggle
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                :model-value="link.status"
                @update:model-value="
                  (newStatus) => updateStatus(link.id, newStatus)
                "
              />
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              @click="copyLink(link.key)"
              class="text-green-400 hover:text-green-300 mr-4"
            >
              Copy
            </button>
            <button
              @click="() => openClicksModal(link.id)"
              class="text-blue-400 hover:text-blue-300 mr-4"
            >
              View Clicks
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

    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Clicks for Link ID: {{ selectedLinkId }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="p-4">
          <table
            class="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  ip
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  city
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  country
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  user_agent
                </th>
                <th
                  class="px-6 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  created_at
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="click in clicks"
                :key="click.id"
                class="hover:bg-gray-700"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100"
                >
                  {{ click.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ click.ip }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ click.city }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ click.country }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ click.user_agent }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ click.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between items-center mt-4">
            <UButton @click="prevPage" :disabled="currentPage === 1"
              >Previous</UButton
            >
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <UButton @click="nextPage" :disabled="currentPage === totalPages"
              >Next</UButton
            >
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const links = ref<Database["public"]["Tables"]["links"]["Row"][]>([]);
const clicks = ref<Database["public"]["Tables"]["clicks"]["Row"][]>([]);
const isOpen = ref(false);
const selectedLinkId = ref<string | null>(null);
const currentPage = ref(1);
const pageSize = 20;
const totalPages = ref(0);

// Fetch links
const fetchLinks = async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching links:", error);
  } else {
    links.value = data || [];
  }
};

// Fetch clicks
const fetchClicks = async (linkId: string) => {
  const { data, error } = await client
    .from("clicks")
    .select("*")
    .eq("link_id", linkId)
    .range(
      (currentPage.value - 1) * pageSize,
      currentPage.value * pageSize - 1
    );

  if (error) {
    console.error("Error fetching clicks:", error);
  } else {
    clicks.value = data || [];
    totalPages.value = Math.ceil(data.length / pageSize);
  }
};

// Modal operations
const openClicksModal = (linkId: string) => {
  selectedLinkId.value = linkId;
  currentPage.value = 1;
  fetchClicks(linkId);
  isOpen.value = true;
};

// Pagination
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchClicks(selectedLinkId.value!);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchClicks(selectedLinkId.value!);
  }
};

onMounted(() => {
  fetchLinks();

  client
    .channel("link-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "links" },
      (payload: any) => {
        fetchLinks();
      }
    )
    .subscribe();

  client
    .channel("click-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "clicks" },
      (payload: any) => {
        if (isOpen.value && selectedLinkId.value) {
          fetchClicks(selectedLinkId.value);
        }
      }
    )
    .subscribe();
});

watch(() => user.value?.id, fetchLinks, { immediate: true });

// Notification handling
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

const updateStatus = async (id: string, newValue: boolean) => {
  try {
    const { error } = await client
      .from("links")
      .update({ status: newValue })
      .eq("id", id)
      .single();
    if (error) throw error;
    addNotification("Status updated ✅");
  } catch (error) {
    console.error(`Error updating status for link with ID ${id}:`, error);
    addNotification("Failed to update status ❌");
  }
};
</script>
