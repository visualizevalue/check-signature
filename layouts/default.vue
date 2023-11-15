<template>
  <main>
    <NavBar />

    <slot />
  </main>
</template>

<style lang="postcss" scoped>
main {
  width: 100%;
  min-height: var(--100vh);
  display: flex;
  flex-direction: column;
  gap: var(--size-4);

  :deep(.content-width) {
    width: 100%;
    max-width: var(--content-width);
    padding: 0 var(--size-4);
    margin: 0 auto;
  }
}
</style>
