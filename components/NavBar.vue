<template>
  <nav>
    <!-- <div>
      <Icon type="check" />
      <span>Signature <span class="hidden-sm">Check</span></span>
    </div> -->
    <Connect />
  </nav>
</template>

<script setup>
</script>

<style lang="postcss" scoped>
nav,
nav > div:first-child {
  display: flex;
  justify-content: space-between;
  justify-content: flex-end;
  align-items: center;
  gap: var(--size-4)
}

nav {
  padding: var(--size-4);
  width: 100%;
  /* max-width: var(--content-width);
  margin: 0 auto; */
}
</style>
