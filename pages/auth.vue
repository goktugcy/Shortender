<template>
  <div class="h-screen grid place-content-center relative">
    <div class="container">
      <div class="card">
        <div
          class="flex mx-auto justify-center items-center w-20 h-20 rounded-full border border-white/30 shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <button
          class="py-2 text-2xl w-full px-6 rounded-full mt-6 btn"
          @click="loginWithGitHub"
        >
          Continue with GitHub
        </button>
        <hr class="border-white/10 my-8" />
        <form @submit.prevent="handleForm">
          <div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                class="w-full py-1 px-2 rounded-lg mt-1"
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                v-model="formData.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="w-full py-1 px-2 rounded-lg mt-1"
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                v-model="formData.password"
              />
            </div>
          </div>
          <button
            type="submit"
            class="py-2 capitalize rounded-full mt-5 text-2xl px-6 w-full btn"
          >
            {{ authMethodLogin ? "sign in" : "register" }}
          </button>
        </form>
        <div
          class="text-red-600 text-center mt-3 m-auto text-xm max-w-[300px]"
          v-show="errorMessage"
        >
          {{ errorMessage }}
        </div>
        <div class="text-white/70 text-center mt-3 text-xm">
          <template v-if="authMethodLogin">
            Don't have an account?
            <button class="underline" @click="authMethodLogin = false">
              Register
            </button>
          </template>
          <template v-else>
            Already have an account?
            <button class="underline" @click="authMethodLogin = true">
              Sign in
            </button>
          </template>
        </div>
      </div>
    </div>
    <div
      class="max-w-[1200px] px-2 w-full absolute top-24 left-1/2 -translate-x-1/2"
    >
      <Transition :duration="{ enter: 600, leave: 600 }" name="notification">
        <div class="card text-lg w-fit ml-auto" v-if="isShowNotification">
          A confirmation email has been sent to your email
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
// definePageMeta({
//   middleware: ["auth"],
// });

const supabaseAuth = useSupabaseClient();

let isShowNotification = ref<boolean>(false);
let errorMessage = ref<string>("");
let authMethodLogin = ref<boolean>(true);
const formData = ref({ email: "", password: "" });
const re: RegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const loginWithGitHub = async () => {
  try {
    const { error } = await supabaseAuth.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: import.meta.env.APP_URL },
    });

    if (error) errorMessage.value = error.message;
  } catch (err) {
    errorMessage.value = "Something went wrong";
  }
};

const handleForm = () => {
  const { email, password } = formData.value;

  if (!email.length || !re.test(email.toLowerCase())) {
    errorMessage.value = "Enter correct e-mail";
    return;
  }

  if (password.length < 6 || password.length > 72) {
    errorMessage.value = "The max length of the password is 72, the min is 6";
    return;
  }

  authMethodLogin.value ? signInWithPassword() : signUp();
};

const signInWithPassword = async () => {
  try {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      ...formData.value,
    });

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    if (data) navigateTo("/dashboard");
  } catch (err) {
    errorMessage.value = "Something went wrong";
  }
};

const signUp = async () => {
  try {
    const { data, error } = await supabaseAuth.auth.signUp({
      ...formData.value,
      options: {
        emailRedirectTo: import.meta.env.APP_URL,
      },
    });

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    if (data) {
      showNotification();
      authMethodLogin.value = true;
      formData.value.email = "";
      formData.value.password = "";
    }
  } catch (err) {
    errorMessage.value = "Something went wrong";
  }
};

const showNotification = () => {
  isShowNotification.value = true;
  setTimeout(() => (isShowNotification.value = false), 3500);
};

watch(authMethodLogin, () => {
  formData.value.email = "";
  formData.value.password = "";
  errorMessage.value = "";
});
</script>

<style scoped></style>
