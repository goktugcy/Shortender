<template>
  <div class="h-screen grid place-content-center">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl leading-normal heading">
        Make your links shorter with
        <span class="text-6xl">Shortender</span>
      </h1>
      <p class="text-white/80 my-10 max-w-md mx-auto">
        Shortender is a simple and easy-to-use URL shortener that allows you to shorten any URL with just a few clicks.
      </p>
      <NuxtLink :to="{ name: 'dashboard' }" class="py-2 text-2xl rounded-full px-6 btn">Short Now!</NuxtLink>
    </div>
  </div>
</template>