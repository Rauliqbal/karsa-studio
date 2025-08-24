<script setup lang="ts">
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div>
    <LayoutNavbar />
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>
    </ul>
    <slot />
  </div>
</template>
