<template>
  <div class="h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <div class="basis-1/2 bg-background rounded-md relative flex flex-col gap-4 p-4 overflow-auto min-h-72 place-items-center">
      <div class="flex flex-row gap-4">
        <input class="bg-second text-white p-3 rounded-md" type="date" id="start" name="trip-start" value="2024-04-02" min="2024-01-01" max="2024-12-31" />

        <select 
          class="text-white rounded-md py-2 px-4 bg-second" 
          :name="`visit-${index}`" 
          :id="`visit-${index}`"
          v-model="selected[index]"
        >
          <option selected value="16:00">16:00</option>
          <option value="17:30">17:30</option>
          <option value="19:00">19:00</option>
          <option value="20:30">20:30</option>
        </select>
      </div>

      <div v-for="index in 12" :key="index" class="entry-block w-full">
        <span class="text-lg">Иванов Иван Иванович</span>
        <select 
          :class="`ml-3 text-white rounded-md p-1 ${bgColor[selected[index]]}`" 
          :name="`visit-${index}`" 
          :id="`visit-${index}`"
          v-model="selected[index]"
        >
          <option value="IN">Присутствует</option>
          <option value="UP">Уважительная</option>
          <option value="OUT">Отсутствует</option>
        </select>
      </div>
    </div>

    <div class="basis-1/2 bg-background rounded-md min-h-72 relative">
      <div class="p-4 flex flex-col gap-4 overflow-auto">
        <div v-for="new_data in news" :key="new_data.id" class="new-block-back">
          <div class="new-block-forward">
            От: {{ new_data.date }}
            <br>
            {{ new_data.text }}
          </div>
        </div>
      </div>

      <div class="w-full absolute bottom-0 bg-second flex flex-row py-3 px-3 rounded-b-md">
        <ui-input placeholder="Текст новости" v-model="newText" class="w-full text-lg"></ui-input>
        <button class="text-white p-3 hover:bg-white hover:bg-opacity-15 ml-3 rounded-md transition-all" @click="newText = ''">
          <svg-icon class="h-8 w-8" type="mdi" :path="mdiSend"></svg-icon>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import UiInput from '@/components/ui/Input.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSend } from '@mdi/js';

const bgColor = {
  'IN': 'bg-green-600',
  'OUT': 'bg-red-600',
  'UP': 'bg-yellow-600'
}

const newText = ref('')

const selected = ref({
  1: 'IN',
  2: 'IN',
  3: 'IN',
  4: 'IN',
  5: 'IN',
  6: 'IN',
  7: 'IN',
  8: 'IN',
  9: 'IN',
  10: 'IN',
  11: 'IN',
  12: 'IN',
})

const news = [
  {
    id: 1,
    date: '02.11.2023',
    text: '05.11.2023 Спортивный зал не работает'
  },
  {
    id: 2,
    date: '28.10.2023',
    text: '01.11.2023 Спортивный зал до 19:00'
  }
]
</script>

<style scoped>
.entry-block {
  @apply bg-second rounded-md shadow-md text-white p-3 text-center
}
</style>