<template>
  <article>
    <Account :address="signature.signer" />
    <span>{{ signature.action }}</span>
    <Object :object="signature.object" />
  </article>
</template>

<script setup>
const { signature } = defineProps({
  signature: Object,
})
</script>

<style lang="postcss" scoped>
article {
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-2);
  align-items: center;
}
</style>
