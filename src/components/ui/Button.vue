<template>
  <button 
    :type="props.submit ? 'submit' : 'button'" 
    :class="props.color + ' text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue'"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  submit: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'bg-blue-500'
  }
})
</script>