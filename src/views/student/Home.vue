<template>
  <div class="h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <div class="basis-1/2 bg-background rounded-md flex flex-col gap-4 p-4 overflow-auto min-h-72">
      <div v-for="entry in entries" :key="entry.id" class="entry-block">
        {{ entry.weekday }}: {{ entry.time }}
      </div>
    </div>

    <div class="basis-1/2 bg-background rounded-md flex flex-col gap-4 p-4 overflow-auto min-h-72">
      <div v-for="new_data in news" :key="new_data.id" class="new-block-back">
        <div class="new-block-forward">
          От: {{ new_data.date }}
          <br>
          {{ new_data.text }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const entries = [
  {
    id: 1,
    weekday: 'Понедельник',
    time: '20:30'
  },
  {
    id: 2,
    weekday: 'Среда',
    time: '17:30'
  },
  {
    id: 3,
    weekday: 'Пятница',
    time: '19:00'
  }
]

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