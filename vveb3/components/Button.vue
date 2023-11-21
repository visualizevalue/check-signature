<template>
  <NuxtLink v-if="to" :to="to" class="button" :exact="exact"><slot /></NuxtLink>
  <button v-else class="button"><slot /></button>
</template>

<script setup>
const { to, exact } = defineProps({
  to: String,
  exact: Boolean,
})
</script>
