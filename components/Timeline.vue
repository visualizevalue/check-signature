<template>
  <section class="timeline">
    <SignatureListItem
      v-for="signature in signatures?.data"
      :key="signature.cid"
      :signature="signature"
    />
  </section>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core'

const config = useRuntimeConfig()

const { data: signatures, refresh } = await useFetch(`${config.public.api}/v1/signatures?limit=12`)

useIntervalFn(() => refresh(), 60_000)
</script>

<style lang="postcss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  align-items: flex-start;
}
</style>
