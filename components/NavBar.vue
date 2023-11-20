<template>
  <nav>
    <NuxtLink to="/">
      <span>Signature</span>
      <Icon type="check" class="check" title="check" />
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

  span {
    position: relative;
    top: 0.075rem;
  }

  .check {
    color: var(--gray-z-3 );
    flex-shrink: 0;
    flex-grow: 0;
  }
}

nav {
  padding: var(--padding);
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
}
</style>
