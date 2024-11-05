<template>
  <div class="full-height">
    <StoreSignature />

    <hr>

    <HandwrittenMarks />
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
  padding: var(--padding-lg) 0 var(--size-9);
}

hr {
  margin: var(--padding-lg) 0;
}
</style>
