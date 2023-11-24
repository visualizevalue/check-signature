<template>
  <nav>
    <div class="full-width">
      <NuxtLink to="/">
        <span>Signature</span>
        <Icon type="check" class="check" title="check" />
      </NuxtLink>
      <Connect :wallet-connect-project-id="config.public.walletConnectProjectId" :rpc="config.public.rpc" />
    </div>
  </nav>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style lang="postcss" scoped>
nav {
  border-bottom: var(--border-dark);
}

.full-width,
.full-width > a:first-child {
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

.full-width {
  padding: var(--padding);
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
}
</style>
