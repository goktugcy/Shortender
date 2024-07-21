export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (to.name !== "auth" && !user.value) {
    return navigateTo("/auth");
  }

  if (to.name === "auth" && user.value) {
    return navigateTo("/");
  }
});
