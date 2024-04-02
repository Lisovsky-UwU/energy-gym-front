<template>
  <MainBlockLkTemplate title="Списки студентов">

    <div class="flex flex-col gap-4 p-4">
      <router-link v-for="(weekday, index) in weekdayNames" :key="index" :to="`/coach/lists/${weekday}`" class="bg-second text-xl text-center rounded-md p-3 text-white shadow-md">
        {{ weekday }}
      </router-link>
    </div>

  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'

const weekdayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
]
</script>
