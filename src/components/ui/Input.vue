<template>
  <label :for="name" class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
  <input :type="props.type" :id="name" :name="name" :placeholder="props.placeholder" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text"
  },
})

const name = Math.random()
</script>
