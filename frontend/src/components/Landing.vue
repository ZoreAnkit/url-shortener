<script setup>
import { computed } from "vue";

const msg = computed(() => {
  return "Welcome";
});
</script>
<template>
  <div class="mt-2">
    <h1>{{ msg + " " + "You are logged in" }}</h1>
  </div>
</template>
