<template>
  <component :is="component"/>
</template>

<script setup lang="ts">
import LoginCoach from "@/views/LoginCoach.vue";
import CoachLk from "@/views/CoachLk.vue";
import { computed } from "vue";

const component = computed(() => {
  if (localStorage.getItem('token_coach') === null) {
    return LoginCoach
  } else {
    return CoachLk
  }
})
</script>

<style scoped></style>