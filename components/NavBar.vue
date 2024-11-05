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

  <nav>
    <menu class="full-width">
      <NuxtLink :to="{ path: '/' }"><span>Cryptographic</span> <span> Mark</span></NuxtLink>
      <NuxtLink :to="{ path: '/mark' }"><span>Handwritten</span> <span> Mark</span></NuxtLink>
    </menu>
  </nav>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style scoped>
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
    color: var(--gray-z-3);
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

menu.full-width {
  justify-content: flex-start;
  gap: var(--padding-lg);
  padding: 0 var(--size-4);

  @media (--md) {
    justify-content: center;
  }

  > a:first-child,
  > a {
    padding: var(--size-4);
    position: relative;
    display: block;
    color: var(--gray-z-5);
    transition: all var(--speed);

    &:after {
      content: '';
      position: absolute;
      /* bottom: calc(-1 * var(--size-4) - 2px); */
      /* bottom: calc(-1 * var(--size-4) - 1px); */
      bottom: -1px;
      left: calc(-1 * var(--size-3));
      height: 1px;
      width: calc(100% + var(--size-3)*2);
      background-color: transparent;
    }

    span:last-child {
      display: none;

      @media (--md) {
        display: inline;
      }
    }

    &:--highlight,
    &.router-link-exact-active {
      color: var(--color);

      &:after {
        background-color: var(--gray-z-6);
      }
    }

    /* &:--highlight:after */
    /* &.router-link-exact-active:after { */
    /*   background-color: var(--gray-z-10); */
    /* } */
  }
}
</style>
