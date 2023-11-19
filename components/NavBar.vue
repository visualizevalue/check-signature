<template>
  <nav>
    <NuxtLink to="/">
      <Icon type="check" class="check" />
      <span>Signature <span class="hidden-sm">Check</span></span>
    </NuxtLink>
    <Connect />
  </nav>
</template>

<script setup>
</script>

<style lang="postcss" scoped>
nav,
nav > a:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--size-3);

  .check {
    position: relative;
    color: var(--gray-z-3 );
    flex-shrink: 0;
    bottom: 0.1em;
  }
}

nav {
  padding: var(--size-6) var(--size-7) var(--size-7);
  width: 100%;
  /* max-width: var(--content-width);
  margin: 0 auto; */
}
</style>
