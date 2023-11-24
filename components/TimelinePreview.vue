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

const { data: signatures, execute, refresh } = await useLazyFetch(
  `${config.public.api}/v1/signatures?limit=9`,
  { immediate: false }
)

onMounted(() => execute())
useIntervalFn(() => refresh(), 60_000)
</script>

<style lang="postcss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  height: 100%;

  > article {
    flex-shrink: 0;
  }

  > a {
    position: relative;
    z-index: 10;
    padding: var(--size-2) var(--size-4);
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    transition: all var(--speed);
    color: var(--gray-z-6);

    &:--highlight {
      color: var(--color);
    }
  }

  &:after {
    content: '';
    z-index: 5;
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, var(--transparent-black), var(--black));
  }
}
</style>
