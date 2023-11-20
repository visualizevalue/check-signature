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

  :deep(.content-width) {
    width: 100%;
    max-width: var(--content-width);
    padding: 0 var(--padding);
    margin: 0 auto;
  }

  :deep(.full-height) {
    height: 100%;
    flex-grow: 1;
  }
}
</style>
