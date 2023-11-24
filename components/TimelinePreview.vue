<template>
  <section class="timeline">
    <SignatureListItem
      v-for="signature in signatures?.data"
      :key="signature.cid"
      :signature="signature"
    />
    <NuxtLink to="/timeline">
      <span>View Timeline</span>
    </NuxtLink>
  </section>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core'

const config = useRuntimeConfig()

const { data: signatures, refresh } = await useFetch(`${config.public.api}/v1/signatures?limit=9`)

useIntervalFn(() => refresh(), 60_000)
</script>

<style lang="postcss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  height: 100%;

  > a {
    position: absolute;
    z-index: 10;
    bottom: 0;
    padding: 8rem 1rem 1rem;
    left: 0;
    right: 0;
    width: 100%;
    background: linear-gradient(to bottom, var(--transparent-black), var(--black));
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--speed);
    color: var(--gray-z-6);

    &:--highlight {
      color: var(--color);
    }
  }
}
</style>
