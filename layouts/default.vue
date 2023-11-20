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

  &:before,
  &:after {
    content: '';
    display: block;
    width: 10vw;
    height: 100vh;
    width: calc((100vw - var(--content-width)) / 2);
    position: fixed;
    pointer-events: none;
    top: 0;
    z-index: 999;
  }

  &:before {
    left: 0;
    background: linear-gradient(to right, var(--opaque-black), var(--transparent-black));
  }

  &:after {
    right: 0;
    background: linear-gradient(to left, var(--opaque-black), var(--transparent-black));
  }
}
</style>
