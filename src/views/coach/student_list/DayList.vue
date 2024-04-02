<template>
  <MainBlockLkTemplate :title="`Запись на ${$props.weekday}`">

    <div class="flex flex-col gap-4 p-4">
      <div v-for="(time, index) in times" :key="index" class="border border-black rounded-md flex flex-col gap-1 pb-2">
        <div :class="`w-full text-center text-3xl py-2 text-white bg-select-entry-${index + 1}`">
          {{ time }}
        </div>

        <div v-for="index in 12" :key="index" class="text-xl text-center">
          Иванов Иван Иванович
        </div>
      </div>
    </div>

  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'

defineProps({
  weekday: String
})

const times = [ '16:00', '17:30', '19:00', '20:30' ]
</script>