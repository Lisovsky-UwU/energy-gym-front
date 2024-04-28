<template>
  <div class="sm:h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <!--------------------------------------- ПОСЕЩЕНИЯ --------------------------------------->
    <div class="basis-1/2 bg-background rounded-md relative flex flex-col gap-4 p-4 overflow-visible sm:overflow-auto min-h-72 place-items-center">
      <div class="flex flex-row gap-4">
        <input class="bg-second text-white p-3 rounded-md shadow-md" type="date" id="start" name="trip-start" value="2024-04-02" min="2024-01-01" max="2024-12-31" />

        <select 
          class="text-white rounded-md py-2 px-4 bg-second shadow-md" 
          :name="`visit-${index}`" 
          :id="`visit-${index}`"
        >
          <option selected value="16:00">16:00</option>
          <option value="17:30">17:30</option>
          <option value="19:00">19:00</option>
          <option value="20:30">20:30</option>
        </select>
      </div>

      <div v-for="index in 12" :key="index" class="w-full flex gap-2">
        <div class="entry-block grow">
          <span class="text-lg">Иванов Иван Иванович</span>
        </div>
        <select 
          :class="`text-white rounded-md p-1 shadow-md ${bgColor[selected[index]]}`" 
          :name="`visit-${index}`" 
          :id="`visit-${index}`"
          v-model="selected[index]"
        >
          <option value="1">Присутствует</option>
          <option value="2">Уважительная</option>
          <option value="0">Отсутствует</option>
        </select>
      </div>
    </div>

    <!--------------------------------------- ОБЪЯВЛЕНИЯ --------------------------------------->
    <div class="basis-1/2 flex flex-col bg-background rounded-md min-h-72 relative overflow-auto">
      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loadNews">
        <Loading/>
      </div>

      <div class="p-4 gap-4 flex flex-col" v-else-if="newsStore.gymNews.length > 0">
        <div v-for="newData in newsStore.gymNews" :key="newData.id" class="new-block-back">
          <div class="new-block-forward flex flex-rol">
            <div>
              От: {{ newData.createTime }}
              <br>
              {{ newData.body }}
            </div>
            <div class="grow"/>
            <button title="Удалить объявление" class="hover:bg-white hover:bg-opacity-15 transition-all rounded-md px-2" @click="btnDeleteNew(newData.id)">
              <svg-icon class="h-6 w-6" type="mdi" :path="mdiClose"></svg-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full min-h-72 h-full place-items-center gap-3 flex flex-col justify-center text-2xl text-center" v-else>
        <svg-icon class="text-tertiary h-20 w-20" type="mdi" :path="mdiNewspaperRemove"></svg-icon>
        Объявления отсутствуют
      </div>

      <div v-if="!loadNews" class="grow"></div>

      <form v-if="!loadNews" class="w-full bg-second flex flex-row py-3 px-3 rounded-b-md" @submit.prevent="createNew()">
        <ui-input placeholder="Текст объявления" v-model="newText" class="w-full text-lg"></ui-input>
        <button :disabled="loadCreateNew" type="submit" class="text-white p-3 ml-3 rounded-md transition-all" :class="loadCreateNew ? '' : 'hover:bg-white hover:bg-opacity-15'">
          <LoadingSmall v-if="loadCreateNew"/>
          <svg-icon v-else class="h-8 w-8" type="mdi" :path="mdiSend"></svg-icon>
        </button>
      </form>
    </div>
  </div>

  <!--------------------------------------- ДИАЛОГ НА УДАЛЕНИЕ ОБЪЯВЛЕНИЯ --------------------------------------->
  <ModalDialog v-model="showConfirmDelete">
    <div class="flex flex-col gap-6 pt-5 px-6 pb-3  rounded-md bg-background">
      <span class="text-2xl">
        Вы уверены что хотите удалить новость?
      </span>
      <div class="flex place-content-center gap-2">
        <button :disabled="loadDeleteNew" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-red-600" :class="loadDeleteNew ? '' : 'hover:bg-red-400'" @click="confirmDeleteNew()">
          <LoadingSmall v-if="loadDeleteNew"/>
          Удалить
        </button>
        <button :disabled="loadDeleteNew" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-second" :class="loadDeleteNew ? '' : 'hover:bg-slate-600'" @click="showConfirmDelete = false">
          Отмена
        </button>
      </div>
    </div>
  </ModalDialog>
</template>


<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSend, mdiNewspaperRemove, mdiClose } from '@mdi/js';

import UiInput from '@/components/ui/Input.vue'
import Loading from '@/components/ui/Loading.vue';
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import ModalDialog from '@/components/ui/ModalDialog.vue'
import { ref, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useSnackbarStore } from '@/stores/snackbar';

const newsStore = useNewsStore()
const snackbar = useSnackbarStore()

const loadNews = ref(true)
const loadCreateNew = ref(false)
const loadDeleteNew = ref(false)
const showConfirmDelete = ref(false)
const deletedNewId = ref(-1)

const bgColor = {
  0: 'bg-red-600',
  1: 'bg-green-600',
  2: 'bg-yellow-500',
} as any

const newText = ref('')

const selected = ref({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
})

onMounted(() => {
  doLoadNews()
})

function doLoadNews() {
  loadNews.value = true
  newsStore.loadGymNews('COACH')
    .finally(() => {
      loadNews.value = false
    })
}

function createNew() {
  const trimedStr = newText.value.trim()
  if (!trimedStr) {
    snackbar.showError('Введите текст новости')
    return
  }

  loadCreateNew.value = true
  newsStore.create(trimedStr)
    .then(() => {
      newText.value = ''
    })
    .finally(() => {
      loadCreateNew.value = false
    })
}

function btnDeleteNew(newId: number) {
  deletedNewId.value = newId
  showConfirmDelete.value = true
}

function confirmDeleteNew() {
  loadDeleteNew.value = true
  newsStore.delete(deletedNewId.value)
    .then(() => {
      showConfirmDelete.value = false
      doLoadNews()
    })
    .finally(() => {
      loadDeleteNew.value = false
    })
}
</script>

<style scoped>
.entry-block {
  @apply bg-second rounded-md shadow-md text-white p-3 text-center
}
</style>