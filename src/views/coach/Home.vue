<template>
  <div class="sm:h-full flex flex-col lg:flex-row gap-5 sm:gap-14 min-w-64">
    <!--------------------------------------- ПОСЕЩЕНИЯ --------------------------------------->
    <div class="basis-1/2 bg-background rounded-md relative flex flex-col gap-4 p-4 overflow-visible sm:overflow-auto min-h-72 place-items-center">
      <div class="flex flex-row gap-4">
        <input class="bg-second text-white p-3 rounded-md shadow-md" type="date" id="start" name="trip-start" v-model="selectedDate.date" @change="doLoadVisits()"/>

        <select class="text-white rounded-md py-2 px-4 bg-second shadow-md" v-model="selectedDate.time" @change="doLoadVisits()">
          <option value="16:00">16:00</option>
          <option value="17:30">17:30</option>
          <option value="19:00">19:00</option>
          <option value="20:30">20:30</option>
        </select>
      </div>

      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loading.visits">
        <Loading/>
      </div>

      <div v-else-if="visitStore.visits.length > 0" class="w-full flex flex-col gap-2">
        <button class="bg-slate-500 px-4 py-2 rounded-md transition-all text-white" @click="showCancelLessonDialog = true">Отменить занятие</button>

        <div v-for="visit in visitStore.visits" :key="visit.id" class="flex gap-2">
          <div class="entry-block grow cursor-pointer" @click="doShowStudentInfo(visit)">
            <span class="text-lg">{{ visit.user.secondname }} {{ visit.user.firstname }} {{ visit.user.surname }}</span>
          </div>
          <select 
            :class="`text-white rounded-md p-1 shadow-md ${bgColor[visit.mark]}`" 
            :name="`visit-${visit.id}`" 
            :id="`visit-${visit.id}`"
            v-model="visit.mark"
            @change="updateVisit(visit.id, Number($event.target?.value))"
          >
            <option :value="1">Присутствует</option>
            <option :value="2">Уважительная</option>
            <option :value="0">Отсутствует</option>
            <option :value="3" v-if="visit.mark == 3">Отменено</option>
          </select>
        </div>
      </div>

      <div class="w-full min-h-72 h-full place-items-center gap-3 flex flex-col justify-center text-2xl text-center" v-else>
        <svg-icon class="text-primary h-20 w-20" type="mdi" :path="mdiNoteOffOutline"></svg-icon>
        На данный день отсутствуют записи студентов
      </div>
    </div>

    <!--------------------------------------- ОБЪЯВЛЕНИЯ --------------------------------------->
    <div class="basis-1/2 flex flex-col bg-background rounded-md min-h-72 relative overflow-auto">
      <div class="w-full h-full place-items-center flex justify-center text-xl text-center" v-if="loading.news">
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

      <div v-if="!loading.news" class="grow"></div>

      <form v-if="!loading.news" class="w-full bg-second flex flex-row py-3 px-3 rounded-b-md" @submit.prevent="createNew()">
        <ui-input placeholder="Текст объявления" v-model="newText" class="w-full text-lg"></ui-input>
        <button :disabled="loading.createNew" type="submit" class="text-white p-3 ml-3 rounded-md transition-all" :class="loading.createNew ? '' : 'hover:bg-white hover:bg-opacity-15'">
          <LoadingSmall v-if="loading.createNew"/>
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
        <button :disabled="loading.deleteNew" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-red-600" :class="loading.deleteNew ? '' : 'hover:bg-red-400'" @click="confirmDeleteNew()">
          <LoadingSmall v-if="loading.deleteNew"/>
          Удалить
        </button>
        <button :disabled="loading.deleteNew" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-second" :class="loading.deleteNew ? '' : 'hover:bg-slate-600'" @click="showConfirmDelete = false">
          Отмена
        </button>
      </div>
    </div>
  </ModalDialog>

  <!--------------------------------------- ДИАЛОГ С ИНФОЙ О СТУДЕНТЕ --------------------------------------->
  <ModalDialog v-model="showStudentInfo">
    <div class="flex flex-col gap-5 pt-5 rounded-md bg-background">
      <div class="flex flex-row px-6 gap-6">
        <img src="@/assets/default_avatar.svg" alt="default_avatar" class="h-44" v-if="selectedVisit.user.image == null">
        <div v-else class="circle-image">
          <img :src="'/media/' + selectedVisit.user.image">
        </div>
        <div class="flex flex-col gap-3 text-left text-xl justify-center">
          <span>Студенческий: {{ selectedVisit.user.studentCard }}</span>
          <span>{{ selectedVisit.user.secondname }} {{ selectedVisit.user.firstname }} {{ selectedVisit.user.surname }}</span>
          <span>Группа: {{ selectedVisit.user.group }}</span>
        </div>
      </div>
      <button class="w-full bg-second text-white rounded-b-md text-xl py-3" @click="showStudentInfo = false">Закрыть</button>
    </div>
  </ModalDialog>

  <!--------------------------------------- ДИАЛОГ НА ОТМЕНУ ЗАНЯТИЯ --------------------------------------->
  <ModalDialog v-model="showCancelLessonDialog">
    <div class="flex flex-col gap-6 pt-5 px-6 pb-3  rounded-md bg-background">
      <span class="text-2xl">
        Вы уверены что хотите отменить занятие?
      </span>
      <div class="flex place-content-center gap-2">
        <button :disabled="loading.cancelLesson" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-red-600" :class="loading.cancelLesson ? '' : 'hover:bg-red-400'" @click="confirmCancelLesson()">
          <LoadingSmall v-if="loading.cancelLesson"/>
          Да
        </button>
        <button :disabled="loading.cancelLesson" class="text-white text-xl px-6 py-2 rounded-md transition-all bg-second" :class="loading.cancelLesson ? '' : 'hover:bg-slate-600'" @click="showCancelLessonDialog = false">
          Нет
        </button>
      </div>
    </div>
  </ModalDialog>
</template>


<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiNoteOffOutline, mdiNewspaperRemove, mdiSend, mdiClose } from '@mdi/js';

import UiInput from '@/components/ui/Input.vue'
import Loading from '@/components/ui/Loading.vue';
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import ModalDialog from '@/components/ui/ModalDialog.vue'
import { ref, onMounted, reactive } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useSnackbarStore } from '@/stores/snackbar';
import { useVisitStore, type Visit } from '@/stores/visit'

const newsStore = useNewsStore()
const snackbar = useSnackbarStore()
const visitStore = useVisitStore()

let loading = reactive({
  visits: true,
  news: true,
  cancelLesson: false,
  createNew: false,
  deleteNew: false
})

const showConfirmDelete = ref(false)
const showStudentInfo = ref(false)
const showCancelLessonDialog = ref(false)
let selectedVisit = reactive({}) as Visit

const deletedNewId = ref(-1)
const selectedDate = reactive({
  date: new Date().toJSON().slice(0, 10),
  time: '16:00'
})

const bgColor = {
  0: 'bg-red-600',
  1: 'bg-green-600',
  2: 'bg-yellow-500',
  3: 'bg-slate-500'
} as any

const newText = ref('')

onMounted(() => {
  doLoadVisits()
  doLoadNews()
})

function doLoadVisits() {
  loading.visits = true
  visitStore.loadForDate(selectedDate.date, selectedDate.time)
    .finally(() => {
      loading.visits = false
    })
}

function doShowStudentInfo(visit: Visit) {
  selectedVisit = reactive(visit)
  showStudentInfo.value = true
}

async function updateVisit(visitId: number, mark: number) {
  await visitStore.updateVisit(visitId, mark)
}

function doLoadNews() {
  loading.news = true
  newsStore.loadGymNews('COACH')
    .finally(() => {
      loading.news = false
    })
}

function createNew() {
  const trimedStr = newText.value.trim()
  if (!trimedStr) {
    snackbar.showError('Введите текст новости')
    return
  }

  loading.createNew = true
  newsStore.create(trimedStr)
    .then(() => {
      newText.value = ''
    })
    .finally(() => {
      loading.createNew = false
    })
}

function btnDeleteNew(newId: number) {
  deletedNewId.value = newId
  showConfirmDelete.value = true
}

function confirmDeleteNew() {
  loading.deleteNew = true
  newsStore.delete(deletedNewId.value)
    .then(() => {
      showConfirmDelete.value = false
      doLoadNews()
    })
    .finally(() => {
      loading.deleteNew = false
    })
}

function confirmCancelLesson() {
  loading.cancelLesson = true
  visitStore.cancelLesson(selectedDate.date, selectedDate.time)
    .then(() => {
      showCancelLessonDialog.value = false
      doLoadVisits()
    })
    .finally(() => {
      loading.cancelLesson = false
    })
}
</script>

<style scoped>
.entry-block {
  @apply bg-second rounded-md shadow-md text-white p-3 text-center
}
</style>