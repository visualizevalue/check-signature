<template>
  <article :class="[`theme-${signature.action}`]">
    <Icon type="check" class="check" />
    <Address :address="signature.signer" />
    <span>{{ signature.action }}</span>
    <SignatureObject :object="signature.object" minimal class="object" />
    <TimeAgo :timestamp="signature.created_at" class="time" />
    <NuxtLink :to="link" class="link"><span>View Signature</span></NuxtLink>
  </article>
</template>

<script setup>
const { signature } = defineProps({
  signature: Object,
})

const link = computed(() => ({
  path: '/verify',
  query: {
    signer: signature.signer,
    signature: signature.signature,
    subjects: signature.subjects.join(','),
    action: signature.action,
    object: signature.object,
  }
}))
</script>

<style lang="postcss" scoped>
article {
  position: relative;
  display: flex;
  gap: var(--size-2);
  align-items: center;
  color: var(--gray-z-7);
  transition: all var(--speed);
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  font-size: var(--font-sm);
  overflow: hidden;

  > .check {
    color: var(--primary);
    flex-shrink: 0;
  }

  > .object {
    pointer-events: none;
    min-width: 0;
    overflow: hidden;
    /* max-width: 15em;
    overflow: hidden; */
  }

  > .time {
    margin-left: auto;
    padding-left: var(--size-4);
    color: var(--gray-z-5);
  }

  > .link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    span {
      pointer-events: none;
      opacity: 0;
    }
  }

  &:--highlight,
  &:has(> .link:--highlight) {
    color: var(--color);
  }
}
</style>
