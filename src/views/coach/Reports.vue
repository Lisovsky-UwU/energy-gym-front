<template>
  <MainBlockLkTemplate title="Отчеты">
    <div class="flex flex-col items-center sm:h-full sm:absolute justify-center py-6 w-full gap-3">
      <div class="flex flex-row gap-3">
        <span class="text-2xl mt-1">Тип отчета</span>
        <select class="text-white rounded-md py-2 px-4 bg-second shadow-md text-2xl" v-model="selectedReport">
          <option value="Списки">Списки</option>
        </select>
      </div>
      <button class="btn-custom text-2xl">Составить</button>
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import { ref } from 'vue';

const selectedReport = ref('Списки')
</script>