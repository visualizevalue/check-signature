<template>
  <section class="marks">
    <SignatureSVG
      v-for="mark in marks?.data"
      :key="mark.id"
      :path="mark.path"
    />
  </section>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core'

const config = useRuntimeConfig()

const { data: marks, execute, refresh } = await useLazyFetch(
  `${config.public.api}/v1/handwritten-marks?limit=24`,
  { immediate: false }
)

onMounted(() => execute())
useIntervalFn(() => refresh(), 60_000)
</script>

<style scoped>
.marks {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: var(--size-4);
  overflow: hidden;
  position: relative;
  height: 100%;

  :deep(svg) {
    width: 100%;
  }
}
</style>
