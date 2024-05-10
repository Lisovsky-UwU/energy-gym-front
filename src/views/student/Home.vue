<template>
  <div class="sm:h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <div class="basis-1/2 bg-background rounded-md flex flex-col gap-4 p-4 overflow-visible sm:overflow-auto min-h-72">

      <div class="flex flex-row gap-3">
        <span class="text-nowrap text-xl p-1">Месяц:</span>
        <select class="text-white rounded-md py-2 px-4 bg-second shadow-md w-full" v-model="selectedMonth" @change="doLoadEntries()">
          <option value="current">Текущий</option>
          <option value="next">Следующий</option>
        </select>
      </div>

      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loadEntries">
        <Loading/>
      </div>

      <div v-else-if="entryStore.myEntries.length > 0" v-for="entry in entryStore.myEntries" :key="entry.id" class="bg-second rounded-md shadow-md text-white text-center flex flex-row p-2">
        <span class="w-full text-center p-1">
          {{ weekdayNames[entry.selectedTime.weekday] }}: {{ entry.selectedTime.time }} 
        </span>
        <button v-if="selectedMonth == 'next'" title="Удалить объявление" class="hover:bg-white hover:bg-opacity-15 transition-all rounded-md px-2" @click="btnDeleteEntry(entry)">
          <svg-icon class="h-6 w-6" type="mdi" :path="mdiClose"></svg-icon>
        </button>
      </div>

      <div class="w-full min-h-72 h-full place-items-center gap-3 flex flex-col justify-center text-2xl text-center" v-else>
        <svg-icon class="text-primary h-20 w-20" type="mdi" :path="mdiFileDocumentRemove"></svg-icon>
        У вас отсутствуют записи
      </div>
    </div>

    <div class="basis-1/2 bg-background rounded-md flex flex-col gap-4 p-4 overflow-auto min-h-72">
      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loadNews">
        <Loading/>
      </div>

      <div v-else-if="newsStore.gymNews.length > 0" v-for="newData in newsStore.gymNews" :key="newData.id" class="new-block-back">
        <div class="new-block-forward">
          От: {{ newData.createTime }}
          <br>
          {{ newData.body }}
        </div>
      </div>

      <div class="w-full min-h-72 h-full place-items-center gap-3 flex flex-col justify-center text-2xl text-center" v-else>
        <svg-icon class="text-tertiary h-20 w-20" type="mdi" :path="mdiNewspaperRemove"></svg-icon>
        Объявления отсутствуют
      </div>
    </div>
  </div>

  <ModalDialog v-model="showConfirmDelete">
    <div class="flex flex-col gap-6 pt-5 px-6 pb-3  rounded-md bg-background">
      <span class="text-2xl">
        Вы уверены что хотите удалить запись на {{ weekdayNames[selectedEntry.selectedTime.weekday] }}: {{ selectedEntry.selectedTime.time }}?
      </span>
      <div class="flex place-content-center gap-2">
        <button :disabled="loadDeleteEntry" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-red-600" :class="loadDeleteEntry ? '' : 'hover:bg-red-400'" @click="confirmDeleteEntry()">
          <LoadingSmall v-if="loadDeleteEntry"/>
          Удалить
        </button>
        <button :disabled="loadDeleteEntry" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-second" :class="loadDeleteEntry ? '' : 'hover:bg-slate-600'" @click="showConfirmDelete = false">
          Отмена
        </button>
      </div>
    </div>
  </ModalDialog>
</template>


<script setup lang="ts">
import ModalDialog from '@/components/ui/ModalDialog.vue';
import Loading from '@/components/ui/Loading.vue';
import LoadingSmall from '@/components/ui/LoadingSmall.vue';

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFileDocumentRemove, mdiNewspaperRemove, mdiClose } from '@mdi/js';

import { onMounted, ref } from 'vue';
import { useEntryStore, type Entry } from '@/stores/entry'
import { useNewsStore } from '@/stores/news'
import { weekdayNames } from '@/Common';

const entryStore = useEntryStore()
const newsStore = useNewsStore()
const selectedMonth = ref('current')

const loadEntries = ref(true)
const loadNews = ref(true)
const loadDeleteEntry = ref(false)
const showConfirmDelete = ref(false)
const selectedEntry = ref({} as Entry)

onMounted(() => {
  doLoadEntries()
  newsStore.loadGymNews('STUDENT')
    .finally(() => {
      loadNews.value = false
    })
})

function doLoadEntries() {
  loadEntries.value = true
  entryStore.loadMyEntries(selectedMonth.value)
    .finally(() => {
      loadEntries.value = false
    })
}

function btnDeleteEntry(entry: Entry) {
  selectedEntry.value = entry
  showConfirmDelete.value = true
}

function confirmDeleteEntry() {
  loadDeleteEntry.value = true
  entryStore.deleteMyEntry(selectedEntry.value.id)
    .then(() => {
      showConfirmDelete.value = false
      doLoadEntries()
    })
    .finally(() => {
      loadDeleteEntry.value = false
    })
}
</script>