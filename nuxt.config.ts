// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      include: ["/dashboard(/*)?"],
      exclude: ["/(/*)?"],
      cookieRedirect: true,
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  compatibilityDate: "2024-07-22",
});
