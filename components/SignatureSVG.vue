<template>
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path
      stroke="white"
      stroke-width="4px"
      stroke-linecap="round"
      fill="none"
      :d="path"
    />
  </svg>
</template>

<script setup>
const { path } = defineProps({
  path: String,
})
</script>

<style scoped>
  svg {
    border: var(--border-dark);
  }
</style>
