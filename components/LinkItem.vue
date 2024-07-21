<template>
  <div class="card flex items-center justify-between">
    <div>
      <div class="text-green-600 text-3xl">/{{ link.key }}</div>
      <div class="text-white/80 text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[400px]">
        {{ link.url }}
      </div>
    </div>
    <button class="btn w-14 h-14 rounded-full grid place-content-center" @click="copyLink">
      <Transition name="link" mode="out-in">
        <template v-if="!isCopied">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
          </svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </template>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: {
    id: string;
    key: string;
    url: string;
  };
}>();

const config = useRuntimeConfig();

let isCopied = ref<Boolean>(false);

const copyLink = () => {
  navigator.clipboard.writeText(config.public.appUrl + props.link.key);
  isCopied.value = true;

  setTimeout(() => {
    isCopied.value = false;
  }, 3000);
}
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
