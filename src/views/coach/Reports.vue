<template>
  <MainBlockLkTemplate title="Отчеты">
    <div class="flex flex-col items-center sm:h-full sm:absolute justify-center py-6 w-full gap-3">

      <div class="flex flex-col gap-3 justify-start px-4">
        <div class="flex flex-row gap-3">
          <span class="text-xl mt-1 text-nowrap">Тип отчета</span>
          <select class="text-white rounded-md py-2 px-4 bg-second shadow-md text-xl w-full" v-model="selectedReport">
            <option value="Посещения">Посещения</option>
          </select>
        </div>
  
        <div v-if="selectedReport == 'Посещения'" class="flex flex-wrap gap-4 place-content-center">
          <div class="flex flex-row gap-2">
            <span class="text-xl mt-2">От:</span>
            <input class="bg-second text-white p-3 rounded-md shadow-md" type="date" id="start" name="trip-start" v-model="startDate"/>
          </div>
          <div class="flex flex-row gap-2">
            <span class="text-xl mt-2">До:</span>
            <input class="bg-second text-white p-3 rounded-md shadow-md" type="date" id="start" name="trip-start" v-model="endDate"/>
          </div>
        </div>
  
        <ui-input class="w-full" label="Группа (необязательно)" placeholder="БИ-42" v-model="group"/>
      </div>

      <button :disabled="loadingReport" :class="loadingReport ? 'btn-custom-load' : 'btn-custom'" class="mt-4 text-xl" @click="generateExcel">
        <LoadingSmall v-if="loadingReport"/>
        Сформировать
      </button>
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import UiInput from '@/components/ui/Input.vue'
import { ref } from 'vue';
import { useApiCoachStore } from '@/stores/api';
import { useSnackbarStore } from '@/stores/snackbar';
import { start } from 'repl';

const loadingReport = ref(false)

const selectedReport = ref('Посещения')
const startDate = ref(new Date().toJSON().slice(0, 10))
const endDate = ref(new Date().toJSON().slice(0, 10))
const group = ref('')

const api = useApiCoachStore()
const snackbar = useSnackbarStore()

async function generateExcel() {
  if (startDate.value == endDate.value) {
    snackbar.showError('Выберите промежуток дат')
    return
  }

  let body = {
    startDate: startDate.value,
    endDate: endDate.value,
  } as any
  if (group.value) {
    body.group = group.value
  }

  loadingReport.value = true
  try {
    saveBlob(
      await api.doRequest('/report/visits', 'POST', body),
      'test.xlsx'
    )
  } finally {
    loadingReport.value = false
  }
}

function saveBlob(blob: Blob, fileName: string) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
</script>