<script setup>
import { computed } from "vue";

const msg = computed(() => {
  return "You are in Package";
});
</script>
<template>
  <div class="mt-2">
    <h1>{{ msg }}</h1>
  </div>
</template>
