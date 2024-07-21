// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
});
