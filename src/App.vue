<template>
  <RouterView/>

  <!-- Костыль, чтобы точно подгрузить цвета для snackbar -->
  <div class="bg-snackbar-error bg-snackbar-success bg-snackbar-warning" />

  <div :hidden="!snackbar.show" class="absolute top-0 w-full sm:w-auto right-0 place-items-center">
    <div :class="'text-white rounded-lg p-2 m-3 w-auto flex bg-snackbar-' + snackbar.color">
      <span class="flex-grow px-3">{{ snackbar.text }}</span>
      <button @click="snackbar.hide()" class="ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
</script>

<style scoped></style>
