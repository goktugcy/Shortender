<template>
  <div class="h-screen grid place-content-center">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl leading-normal heading">
        Make your links tiny and easy to share with
        <span class="text-6xl">ShortLink</span>
      </h1>
      <p class="text-white/80 my-10 max-w-md mx-auto">
        Transform your long, cumbersome URLs into short and shareable links with
        ShortLink
      </p>
      <NuxtLink :to="{ name: 'dashboard' }" class="py-2 text-2xl rounded-full px-6 btn">Short Now!</NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
