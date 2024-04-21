<template>
  <MainBlockLkTemplate title="Запись в спортзал">

    <!-- Костыль, чтобы точно подгрузить цвета для кнопок -->
    <div class="bg-select-entry-1 bg-select-entry-2 bg-select-entry-3 bg-select-entry-4" />

    <div v-if="loading" class="flex items-center sm:h-full sm:absolute justify-center text-2xl py-6 w-full">
      <Loading/>
    </div>

    <div v-else-if="entryStore.registrateIsOpen">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 place-items-stretch pb-[78px]">
        <div v-for="weekday in avtimeStore.mappedAvTimesAboutWeekdays" :key="'wd-' + weekday.id" class="bg-white shadow-md rounded-md text-center grid grid-cols-2 grid-rows-3 p-4 gap-2 border border-gray-300">
          <span class="text-lg col-span-2">{{ weekdayNames[weekday.weekday] }}</span>

          <template v-for="(time, index) in weekday.times" :key="`${weekday.id}-${time.id}`">
            <button v-if="!time.available" class="w-full py-2 bg-gray-400 text-gray-200 rounded-md text-base font-bold" @click="snackbar.showWarning('На выбранное время закончились места')">
              {{ time.time }}
            </button>
            <button v-else-if="!(weekday.id in selectedTimes && time.id == selectedTimes[weekday.id])" class="w-full py-2 bg-second text-white rounded-md text-base font-bold" @click="selectTime(weekday.id, time.id)">
              {{ time.time }}
            </button>
            <button v-else :class="'bg-select-entry-' + (index + 1) + ' w-full py-2 text-white rounded-md text-base font-bold'" @click="selectTime(weekday.id, time.id)">
              {{ time.time }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-3 items-center sm:h-full sm:absolute justify-center text-2xl py-6 w-full">
      <svg-icon class="text-primary h-20 w-20" type="mdi" :path="mdiLockClock"></svg-icon>
      <span class="text-center">
        Запись закрыта. Откроется 25 числа.
      </span>
    </div>

    <div v-if="entryStore.registrateIsOpen && !loading" class="w-full min-h-[68px] absolute bottom-0 bg-second flex flex-row-reverse py-3 pr-3 rounded-b-md">
      <button :disabled="loadingSave" :class="loadingSave ? 'bg-tertiary-hover text-white px-12 py-2 rounded-md uppercase text-lg font-semibold' : 'bg-tertiary text-white px-12 py-2 rounded-md uppercase text-lg font-semibold hover:bg-tertiary-hover transition-all'" @click="sendSelected()">
        <LoadingSmall v-if="loadingSave"/>
        Записаться
      </button>
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLockClock } from '@mdi/js';
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import Loading from '@/components/ui/Loading.vue';
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import { reactive, onMounted, ref } from 'vue'
import { useEntryStore } from '@/stores/entry';
import { useAvailableTimeStore } from '@/stores/avtime'
import { useSnackbarStore } from '@/stores/snackbar';
import { weekdayNames } from '@/Common';

const entryStore = useEntryStore()
const avtimeStore = useAvailableTimeStore()
const snackbar = useSnackbarStore()

const loading = ref(true)
const loadingSave = ref(false)
let selectedTimes = reactive({} as any)


onMounted(async () => {
  try {
    await entryStore.loadOpen()
    if (entryStore.registrateIsOpen) {
      await avtimeStore.loadAvailableTimes()
    }
  } finally {
    loading.value = false
  }
})


function selectTime(weekday: number, time: number) {
  if (weekday in selectedTimes) {
    if (time == selectedTimes[weekday]) {
      delete selectedTimes[weekday]
    } else {
      selectedTimes[weekday] = time
    }
  } else {
    if (Object.keys(selectedTimes).length >= 3) {
      snackbar.showError('Выбрано максимальное количество дней для записи')
    } else {
      selectedTimes[weekday] = time
    }
  }
}

function sendSelected() {
  const result = [] as Array<number>
  for (var weekday in selectedTimes) {
    result.push(selectedTimes[weekday])
  }
  if (result.length == 0) {
    snackbar.showError('Выберите хотя бы одно время для записи')
    return
  }
  
  loadingSave.value = true
  avtimeStore.loadAvailableTimes()
    .finally(() => {})
  entryStore.createEntries(result)
    .then((result) => {
      if (result.some((el) => el.error)) {
        let success = result.filter((el) => el.error == false)
        let error = result.filter((el) => el.error == true)
        if (success.length == 0) {
          snackbar.showError('Все места на выбранные времена закончились, записи не были созданы', false)
        } else {
          let warnText = 'Закончились места на времена:<br>'
          error.forEach((el) => {
            const avtime = avtimeStore.mappedAvTimes[el.selectedTime]
            warnText += `${weekdayNames[avtime.weekday]} - ${avtime.time}<br>`
          })
          warnText += 'На остальные времена вы были записаны'
          snackbar.showWarning(warnText, false)
        }
      } else {
        snackbar.showSuccess('Вы успешно были записаны на выбранные времена')
      }
      selectedTimes = reactive({})
    })
    .finally(() => {
      loadingSave.value = false
    })
}
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