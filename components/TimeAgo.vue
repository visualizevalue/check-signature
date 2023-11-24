<template>
  <span>{{ timeAgo }}</span>
</template>

<script setup>
import { DateTime } from 'luxon'

const props = defineProps({
  timestamp: String,
})

const timeAgo = computed(() => {
  const d = DateTime.fromISO(props.timestamp)

  return d.toRelative()
})
</script>
