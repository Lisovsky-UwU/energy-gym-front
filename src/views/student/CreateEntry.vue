<template>
  <MainBlockLkTemplate title="Запись в спортзал">

    <!-- Костыль, чтобы точно подгрузить цвета для кнопок -->
    <div class="bg-select-entry-1 bg-select-entry-2 bg-select-entry-3 bg-select-entry-4" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 place-items-stretch pb-[78px]">
      <div v-for="weekday in avTimes" :key="'wd-' + weekday.id" class="bg-white shadow-md rounded-md text-center grid grid-cols-2 grid-rows-3 p-4 gap-2 border border-gray-300">
        <span class="text-lg col-span-2">{{ weekdayNames[weekday.weekday] }}</span>

          <template v-for="(time, index) in weekday.times" :key="`${weekday.id}-${time.id}`">
            <button v-if="!time.available" class="w-full py-2 bg-gray-400 text-gray-200 rounded-md text-base font-bold">
              {{ time.value }}
            </button>
            <button v-else-if="!(weekday.id in selectedTimes && time.id == selectedTimes[weekday.id])" class="w-full py-2 bg-second text-white rounded-md text-base font-bold" @click="selectTime(weekday.id, time.id)">
              {{ time.value }}
            </button>
            <button v-else :class="'bg-select-entry-' + (index + 1) + ' w-full py-2 text-white rounded-md text-base font-bold'" @click="selectTime(weekday.id, time.id)">
              {{ time.value }}
            </button>
          </template>

      </div>
    </div>

    <div class="w-full min-h-[68px] absolute bottom-0 bg-second flex flex-row-reverse py-3 pr-3 rounded-b-md">
      <button class="bg-tertiary text-white px-12 py-2 rounded-md uppercase text-lg font-semibold">
        Записаться
      </button>
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'

let selectedTimes = reactive({})

function selectTime(weekday: number, time: number) {
  if (weekday in selectedTimes) {
    if (time == selectedTimes[weekday]) {
      delete selectedTimes[weekday]
    } else {
      selectedTimes[weekday] = time
    }
  } else {
    console.log(Object.keys(selectedTimes).length)
    if (Object.keys(selectedTimes).length >= 3) {
      alert('Выбрано максимальное количество дней для записи')
    } else {
      selectedTimes[weekday] = time
    }
  }
}

function buttonIsSelected(weekday: number, time: number) {
  console.log(weekday, time, weekday in selectedTimes)
  return weekday in selectedTimes && time == selectedTimes[weekday]
}

// ------------------------------------------------------------
// Потом надо перенести в пину все что ниже
// ------------------------------------------------------------

const weekdayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
]

const avTimes = [
  {
    id: 1,
    weekday: 0,
    times: [ { id: 1, value: '16:00', available: true }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
  {
    id: 2,
    weekday: 1,
    times: [ { id: 1, value: '16:00', available: true }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
  {
    id: 3,
    weekday: 2,
    times: [ { id: 1, value: '16:00', available: true }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
  {
    id: 4,
    weekday: 3,
    times: [ { id: 1, value: '16:00', available: false }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
  {
    id: 5,
    weekday: 4,
    times: [ { id: 1, value: '16:00', available: true }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
  {
    id: 6,
    weekday: 5,
    times: [ { id: 1, value: '16:00', available: true }, { id: 2, value: '17:30', available: true }, { id: 3, value: '19:00', available: true }, { id: 4, value: '20:30', available: true }, ]
  },
]
</script>

<style scoped>
/* Checked */
.form_radio_btn input[type=radio]:checked + label {
	@apply bg-accent
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
	@apply bg-gray-400 text-gray-200
}
</style>