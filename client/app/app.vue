<script setup lang="ts">
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <Toaster />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
