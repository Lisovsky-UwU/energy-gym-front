<template>
  <MainBlockLkTemplate title="Списки студентов">

    <div class="flex flex-col gap-4 p-4">
      <router-link v-for="index in 6" :key="index" :to="`/coach/lists/${index - 1}`" class="bg-second text-xl text-center rounded-md p-3 text-white shadow-md">
        {{ weekdayNames[index - 1] }}
      </router-link>
    </div>

  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import { weekdayNames } from '@/Common';
</script>
