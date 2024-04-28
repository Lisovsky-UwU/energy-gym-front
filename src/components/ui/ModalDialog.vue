<template>
  <Transition appear>
    <div v-if="model" class="modal-overlay" @click="model = false"></div>
  </Transition>
  <Transition appear>
    <div v-if="model" class="modal">
      <slot></slot>
      <!-- <div class="flex flex-col gap-6 pt-5 px-6 pb-3  rounded-md bg-background">
        <span class="text-2xl">
          Вы уверены что хотите удалить новость?
        </span>
        <div class="flex place-content-center gap-2">
          <button class="text-white text-xl px-6 py-2 rounded-md transition-all bg-red-600 hover:bg-red-400">Удалить</button>
          <button class="text-white text-xl px-6 py-2 rounded-md transition-all bg-second hover:bg-slate-600" @click="showConfirmDelete = false">Отмена</button>
        </div>
      </div> -->
    </div>
  </Transition>
</template>


<script setup lang="ts">
const model = defineModel()
</script>


<style scoped>
.modal {
  @apply fixed top-0 bottom-0 left-0 right-0 z-50 px-4 m-auto text-center w-fit h-fit transform-none;
}

.modal-overlay {
  @apply fixed top-0 bottom-0 left-0 right-0 z-40 opacity-60 cursor-default bg-second;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>