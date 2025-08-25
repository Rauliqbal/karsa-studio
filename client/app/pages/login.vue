<script setup>
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
      <form class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 class="text-3xl font-semibold">Welcome Back, Admin</h2>
        <p class="text-gray-500 mt-4">
          Sign in to access your dashboard and manage the agency.
        </p>

        <div class="mt-5">
          <Label for="email">Email</Label>
          <Input
            class="mt-2"
            id="email"
            type="text"
            placeholder="raul@example.com"
          />
        </div>
        <div class="mt-5">
          <Label for="password">Password</Label>
          <Input
            class="mt-2"
            id="password"
            type="password"
            placeholder="At least 8 characters"
          />
        </div>
        <div class="mt-5">
          <Label for="confPassword">Confirm Password</Label>
          <Input
            class="mt-2"
            id="confPassword"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <Button class="w-full mt-6" type="submit">Gass Masuk!</Button>

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
