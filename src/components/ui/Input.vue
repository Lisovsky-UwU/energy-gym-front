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
      :minlength="props.minlength"
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
  },
  minlength: {
    type: String,
    default: "0"
  }
})

const name = Math.random()
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
