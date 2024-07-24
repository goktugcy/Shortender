<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-4 rounded shadow-lg max-w-xs w-full mt-2"
      >
        {{ notification.message }}
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
