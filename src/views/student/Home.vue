<template>
  <div class="sm:h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <div class="basis-1/2 bg-background rounded-md flex flex-col gap-4 p-4 overflow-visible sm:overflow-auto min-h-72">
      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loadEntries">
        <Loading/>
      </div>
      <div v-else-if="entryStore.myEntries.length > 0" v-for="entry in entryStore.myEntries" :key="entry.id" class="entry-block">
        {{ weekdayNames[entry.selectedTime.weekday] }}: {{ entry.selectedTime.time }}
      </div>
      <div class="w-full min-h-72 h-full place-items-center gap-3 flex flex-col justify-center text-2xl text-center" v-else>
        <svg-icon class="text-primary h-20 w-20" type="mdi" :path="mdiFileDocumentRemove"></svg-icon>
        У вас отсутствуют записи
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
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFileDocumentRemove } from '@mdi/js';

import Loading from '@/components/ui/Loading.vue';
import { onMounted, ref } from 'vue';
import { useEntryStore } from '@/stores/entry'
import { weekdayNames } from '@/Common';

const loadEntries = ref(true)
const entryStore = useEntryStore()

onMounted(() => {
  entryStore.loadMyEntries()
    .finally(() => {
      loadEntries.value = false
    })
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