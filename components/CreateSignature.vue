<template>
  <section>
    <Icon type="check" />

    <span>I</span>

    <select>
      <option selected>said</option>
      <option>wrote</option>
      <option>made</option>
      <option>like</option>
      <option>agree with</option>
      <option>bought</option>
    </select>

    <span>this</span>

    <Input />

    <Button><Icon type="feather" /> <span>Sign</span></Button>
  </section>
</template>

<script setup>
</script>

<style lang="postcss" scoped>
section {
  font-size: var(--font-lg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--size-4);
  padding: var(--size-9) 0;
}
</style>
