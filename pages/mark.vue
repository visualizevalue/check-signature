<template>
  <div class="full-height">
    <StoreSignature />
  </div>
</template>

<script setup>
useMetaData({
  title: 'Handwritten Mark',
  description: 'Store your handwritten signature onchain',
})
</script>

<style scoped>
.full-height {
  max-width: 512px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--padding-lg) 0;
}

h1 {
  font-size: var(--font-lg);
  margin: 0 0 var(--padding-lg) 0;
}
</style>
