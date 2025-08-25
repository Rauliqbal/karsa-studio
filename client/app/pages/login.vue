<script setup>
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Cookies from "js-cookie";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const error = ref(null);

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const router = useRouter();

const resetField = () => {
  (email.value = ""), (password.value = ""), (confirmPassword.value = "");
};

const handleLogin = async () => {
  isLoading.value = true;

  const payload = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    const res = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      body: payload,
    });

    resetField();
    Cookies.set("karsa_token", res.data.token);
    console.log(res.data);
    router.push("/dashboard");
    toast("Login Successfully!");
  } catch (err) {
    error.value = err?.data?.error?.fieldErrors || {};
    toast("Login Failed!");
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: false,
});

useHead({
  title: "Sign In | Karsa Studio",
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 items-center">
    <div>
      <img
        class="min-h-screen object-cover"
        src="~/assets/images/background.jpg"
        alt="pattern"
      />
    </div>
    <div>
      <form
        @submit.prevent="handleLogin"
        class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl"
      >
        <h2 class="text-3xl font-semibold">Welcome Back, Admin</h2>
        <p class="text-gray-500 mt-4">
          Sign in to access your dashboard and manage the agency.
        </p>

        <div class="mt-5">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            class="mt-2"
            id="email"
            type="text"
            placeholder="raul@example.com"
          />
        </div>
        <div class="mt-5">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            class="mt-2"
            id="password"
            type="password"
            placeholder="At least 8 characters"
          />
          <p v-if="error?.password" class="text-red-500 text-sm mt-1">
            {{ error.password[0] }}
          </p>
        </div>
        <div class="mt-5">
          <Label for="confPassword">Confirm Password</Label>
          <Input
            v-model="confirmPassword"
            class="mt-2"
            id="confPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <p
            v-for="(msg, i) in error?.confirmPassword"
            :key="i"
            class="text-red-500 text-sm mt-1"
          >
            {{ msg }}
          </p>
        </div>

        <Button class="w-full mt-6" type="submit" :disabled="isLoading"
          >Gass Masuk!</Button
        >

        <p class="text-gray-500 mt-6">
          Don't have an account?
          <NuxtLink class="font-medium text-gray-700" to="/register">
            Sign up</NuxtLink
          >
        </p>
      </form>
    </div>
  </div>
</template>
