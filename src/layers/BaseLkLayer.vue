<template>
  <div v-if="loading" class="min-h-screen grid grid-cols-1 gap-1 place-items-center">
    <Loading/>
  </div>
  <component v-else :is="component"/>
</template>

<script setup lang="ts">
import LoginLk from "@/views/LoginLk.vue";
import StudentLk from "@/views/StudentLk.vue";
import Loading from "@/components/ui/Loading.vue"
import { computed, ref, onMounted } from "vue";
import { useApiStudentStore } from "@/stores/api";

const loading = ref(true)
const api = useApiStudentStore()

onMounted(() => {
  api.checkLogin()
    .finally(() => {
      loading.value = false
    })
})

const component = computed(() => {
  if (api.isLogin) {
    return StudentLk
  } else {
    return LoginLk
  }
})
</script>

<style scoped></style>