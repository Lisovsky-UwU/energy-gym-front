<template>
  <component :is="component"/>
</template>

<script setup lang="ts">
import LoginLk from "@/views/LoginLk.vue";
import StudentLk from "@/views/StudentLk.vue";
import { computed } from "vue";

const component = computed(() => {
  if (localStorage.getItem('token') === null) {
    return LoginLk
  } else {
    return StudentLk
  }
})
</script>

<style scoped></style>