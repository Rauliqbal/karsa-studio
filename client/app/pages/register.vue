<script setup>
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const error = ref(null);

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const resetField = () => {
  (name.value = ""),
    (email.value = ""),
    (password.value = ""),
    (confirmPassword.value = "");
};

const handleRegister = async () => {
  isLoading.value = true;
  error.valueOf = null;

  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    role: "member",
  };

  try {
    await $fetch(`${apiBase}/auth/register`, {
      method: "POST",
      body: payload,
    });

    resetField();
    toast("Registered Successfully!");
  } catch (error) {
    console.error(error);
    resetField();
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: false,
});

useHead({
  title: "Sign Up | Karsa Studio",
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 items-center">
    <div class="px-4">
      <form
        @submit.prevent="handleRegister"
        class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl"
      >
        <h2 class="text-3xl font-semibold">Admin Registration</h2>
        <p class="text-gray-500 mt-4">
          Create a secure account to manage your digital agency content and
          team.
        </p>

        <div class="mt-6">
          <Label for="name">Name</Label>
          <Input
            v-model="name"
            class="mt-2"
            id="name"
            type="text"
            placeholder="Raul iqbal"
          />
        </div>
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
        </div>

        <Button class="w-full mt-6" type="submit">Register</Button>

        <p class="text-gray-500 mt-6">
          Already have an account?
          <NuxtLink class="font-medium text-gray-700" to="/login">
            Sign in</NuxtLink
          >
        </p>
      </form>
    </div>
    <div>
      <img
        class="min-h-screen object-cover"
        src="~/assets/images/background.jpg"
        alt="pattern"
      />
    </div>
  </div>
</template>
