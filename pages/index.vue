<template>
  <div class="h-screen grid place-content-center">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl leading-normal heading">
        Make your links shorter with
        <span class="text-6xl">Shortender</span>
      </h1>
      <p class="text-white/80 my-10 max-w-md mx-auto">
        Shortender is a simple and easy-to-use URL shortener that allows you to
        shorten any URL with just a few clicks.
      </p>
      <NuxtLink
        :to="{ name: 'dashboard' }"
        class="gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
        >Short Now!
      </NuxtLink>
    </div>
  </div>
</template>
<style scoped>
.spotlight {
  background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
  filter: blur(20vh);
  height: 40vh;
  bottom: -30vh;
}
.gradient-border {
  position: relative;
  border-radius: 0.5rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
@media (prefers-color-scheme: light) {
  .gradient-border {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .gradient-border::before {
    background: linear-gradient(
      90deg,
      #e2e2e2 0%,
      #e2e2e2 25%,
      #00dc82 50%,
      #36e4da 75%,
      #0047e1 100%
    );
  }
}
@media (prefers-color-scheme: dark) {
  .gradient-border {
    background-color: rgba(20, 20, 20, 0.3);
  }
  .gradient-border::before {
    background: linear-gradient(
      90deg,
      #303030 0%,
      #303030 25%,
      #00dc82 50%,
      #36e4da 75%,
      #0047e1 100%
    );
  }
}
.gradient-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  padding: 2px;
  width: 100%;
  background-size: 400% auto;
  opacity: 0.5;
  transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.gradient-border:hover::before {
  background-position: -50% 0;
  opacity: 1;
}
.fixed {
  position: fixed;
}
.left-0 {
  left: 0;
}
.right-0 {
  right: 0;
}
.z-10 {
  z-index: 10;
}
.z-20 {
  z-index: 20;
}
.grid {
  display: grid;
}
.mb-16 {
  margin-bottom: 4rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.max-w-520px {
  max-width: 520px;
}
.min-h-screen {
  min-height: 100vh;
}
.w-full {
  width: 100%;
}
.flex {
  display: flex;
}
.cursor-pointer {
  cursor: pointer;
}
.place-content-center {
  place-content: center;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.overflow-hidden {
  overflow: hidden;
}
.bg-white {
  --un-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--un-bg-opacity));
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-center {
  text-align: center;
}
.text-8xl {
  font-size: 6rem;
  line-height: 1;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-black {
  --un-text-opacity: 1;
  color: rgb(0 0 0 / var(--un-text-opacity));
}
.font-light {
  font-weight: 300;
}
.font-medium {
  font-weight: 500;
}
.leading-tight {
  line-height: 1.25;
}
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (prefers-color-scheme: dark) {
  .dark\:bg-black {
    --un-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--un-bg-opacity));
  }
  .dark\:text-white {
    --un-text-opacity: 1;
    color: rgb(255 255 255 / var(--un-text-opacity));
  }
}
@media (min-width: 640px) {
  .sm\:px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .sm\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .sm\:py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .sm\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  .sm\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
