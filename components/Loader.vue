<template>
  <Icon type="loader" />
</template>

<style lang="postcss" scoped>
.icon {
  animation: spin infinite linear 5s;
  color: var(--gray-z-5);
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
