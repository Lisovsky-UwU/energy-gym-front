<template>
  <MainBlockLkTemplate :title="`Запись на ${weekdayNames[$props.weekday || 0]}`">

    <div v-if="loading" class="flex items-center sm:h-full sm:absolute justify-center text-2xl py-6 w-full">
      <Loading />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div v-for="(time, index) in times" :key="index" class="border border-black rounded-md flex flex-col bg-second">
        <div :class="`w-full text-center text-3xl py-2 text-white bg-select-entry-${index + 1}`">
          {{ time }}
        </div>

        <div class="flex flex-col gap-2 grow place-content-center">

          <div v-if="entries.filter((e) => e.selectedTime.time == time).length > 0" class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" class="px-5 py-3">
                    Студенческий
                  </th>
                  <th scope="col" class="px-5 py-3">
                    ФИО
                  </th>
                  <th scope="col" class="px-5 py-3">
                    Группа
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in entries.filter((e) => e.selectedTime.time == time)" :key="entry.id" class="bg-second border-b border-gray-700">
                  <th scope="row" class="px-5 py-3 font-medium whitespace-nowrap text-white">
                    {{ entry.user.studentCard }}
                  </th>
                  <td class="px-5 py-3 text-white">
                    {{ entry.user.secondname }} {{ entry.user.firstname }} {{ entry.user.surname }}
                  </td>
                  <td class="px-5 py-3 text-white">
                    {{ entry.user.group }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-xl text-center text-white py-4">
            Записи на данный день нет
          </div>
        </div>
      </div>
    </div>

  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import Loading from '@/components/ui/Loading.vue';
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import { weekdayNames } from '@/Common';
import { useEntryStore, type EntryExtend } from '@/stores/entry'
import { ref, onMounted } from 'vue';

const entryStore = useEntryStore()
let entries = ref([] as Array<EntryExtend>)

const loading = ref(true)

const props = defineProps({
  weekday: String
})

onMounted(() => {
  const [Y, M] = new Date().toJSON().slice(0, 10).split('-')
  entryStore.getForDay(Number(props.weekday), `${M}-${Y}`)
    .then((result) => {
      entries.value = result
    })
    .finally(() => {
      loading.value = false
    })
})

const times = ['16:00', '17:30', '19:00', '20:30']
</script>