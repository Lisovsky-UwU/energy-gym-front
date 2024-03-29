<template>
  <div class="bg-background h-full rounded-t-lg flex flex-col rounded-b-md min-w-64">
    <div class="bg-second w-full min-h-[68px] text-3xl font-thin rounded-t-md text-white flex place-items-center justify-center">
      {{ props.title }}
    </div>

    <div class="overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String
  }
})
</script>