<template>
  <div class="sign-mark full-height">
    <DrawSignature ref="sign" />

    <Button @click="clear" class="clear small" title="Clear">
      <Icon type="trash" />
    </Button>

    <div class="actions">
      <Button @click="inscribe">
        <Icon type="feather" />
        <span>Inscribe</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
useMetaData({
  title: 'Handwritten Mark',
  description: 'Store your handwritten signature onchain',
})

const sign = ref()

const clear = () => {
  sign.value.clear()
}
const inscribe = () => {
  const svg = sign.value.export()

  alert(svg)
}
</script>

<style scoped>
.sign-mark {
  padding-top: var(--size-5);
  padding-bottom: var(--size-5);
  display: grid;
  gap: var(--size-4);
  grid-auto-rows: min-content;
  max-width: 512px;
  position: relative;
  margin: 0 auto;
}

.clear {
  position: absolute;
  top: calc(var(--size-5) + var(--size-4));
  right: var(--size-4);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--size-4);
}
</style>
