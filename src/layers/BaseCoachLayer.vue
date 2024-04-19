<template>
  <div v-if="loading" class="min-h-screen grid grid-cols-1 gap-1 place-items-center">
    <Loading/>
  </div>
  <component v-else :is="component"/>
</template>

<script setup lang="ts">
import LoginCoach from "@/views/LoginCoach.vue";
import CoachLk from "@/views/CoachLk.vue";
import Loading from "@/components/ui/Loading.vue"
import { computed, ref, onMounted } from "vue";
import { useApiCoachStore } from "@/stores/api";

const loading = ref(true)
const api = useApiCoachStore()

onMounted(() => {
  api.checkLogin()
    .finally(() => {
      loading.value = false
    })
})

const component = computed(() => {
  if (api.isLogin) {
    return CoachLk
  } else {
    return LoginCoach
  }
})
</script>

<style scoped></style>