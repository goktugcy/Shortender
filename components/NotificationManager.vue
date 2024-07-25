<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <div v-if="notifications.length" class="fixed bottom-4 right-4 space-y-2">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-gray-800 text-white p-3 rounded-lg shadow-md"
        >
          {{ notification.message }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from "~/composables/useNotification";

const { notifications } = useNotification();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
