<template>
  <div class="fixed top-0 left-0 right-0 border-b border-white/20 bg-blur z-50">
    <nav class="container py-4 flex justify-between items-center">
      <NuxtLink class="text-2xl font-bold hover-effect" :to="{ name: 'index' }"
        >ShortLink
      </NuxtLink>
      <ul class="flex gap-5">
        <li @click="signOut" v-if="isLoggedIn">
          <button class="flex gap-1 hover-effect">
            Sign Out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </li>
        <li v-else>
          <NuxtLink class="py-2 px-3 btn rounded-full" :to="{ name: 'auth' }"
            >Sign Up
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const supabaseAuth = useSupabaseAuthClient();
const user = useSupabaseUser();

const route = useRoute();
const isLoggedIn = ref<boolean>(false);

if (user.value) isLoggedIn.value = true;

const signOut = async () => {
  await supabaseAuth.auth.signOut();
  if (route.name === "dashboard") navigateTo("/");
};

onMounted(() => {
  supabaseAuth.auth.onAuthStateChange((event: unknown, session: unknown) => {
    if (session) isLoggedIn.value = true;
    else isLoggedIn.value = false;
  });
});
</script>

<style scoped></style>
