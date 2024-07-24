<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      class="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-4 rounded shadow-lg max-w-xs w-full"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">

interface Props {
  message: string
}

const props = defineProps<Props>()
const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 3000)
})
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
