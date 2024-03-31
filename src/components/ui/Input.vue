<template>
  <div>
    <label :for="name" class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
    <input 
      :required="props.required"
      :readonly="props.readonly"
      :type="props.type" 
      :id="name" 
      :name="name" 
      :placeholder="props.placeholder" 
      v-model="model"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
    >
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

const props = defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text"
  },
  required: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const name = Math.random()
</script>
