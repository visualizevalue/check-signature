<template>
  <NuxtLink
    v-if="type === 'URI'"
    :to="isIPFS ? gatewayURI : object"
    target="_blank"
    class="uri"
    :class="[`type-${protocol}`, minimal && 'minimal']"
  >
    <span class="protocol">{{ protocol }}://</span>
    <span class="domain" v-if="uri.host">{{ uri.host }}</span>
    <span class="path" v-if="path">{{ path }}</span>
    <span class="search" v-if="uri.search">{{ uri.search }}</span>
    <span class="hash" v-if="uri.hash">{{ uri.hash }}</span>
  </NuxtLink>
  <span v-else>{{ object }}</span>
</template>

<script setup>
import { getType } from '~/utils/sign'

const {
  object
} = defineProps({
  object: String,
  minimal: Boolean,
})

const type = computed(() => getType(object))

const uri = computed(() => {
  try {
    return new URL(object)
  } catch (e) {
    return false
  }
})
const protocol = computed(() => uri.value.protocol.split(':')[0])
const path = computed(() => uri.value.pathname.startsWith('//') ? uri.value.pathname.slice(2) : uri.value.pathname)

const isIPFS = computed(() => ['ipfs', 'ipns'].includes(protocol.value.toLowerCase()))
const gateway = computed(() => `https://ipfs.io`)
const gatewayURI = computed(() => `${gateway.value}/${protocol.value}/${path.value}`)
</script>

<style lang="postcss" scoped>
.uri:not(.unstyled) {
  --background: var(--gray-z-2);

  display: inline-flex;
  padding: 0.1em 0.5em;
  background-color: var(--background);
  border-radius: var(--size-2);
  transition: all var(--speed);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    width: 1em;
    background: linear-gradient(to left, var(--background), transparent);
    border-top-right-radius: var(--size-2);
    border-bottom-right-radius: var(--size-2);
  }

  .protocol,
  .path,
  .search,
  .hash {
    color: var(--gray-z-6);
    white-space: nowrap;
  }

  .path,
  .search,
  .hash {
    flex-shrink: 1;
  }

  &.type-ipfs,
  &.type-ipns {
    .path {
      color: var(--color);
    }
  }

  &:--highlight {
    background-color: var(--gray-z-4);
  }

  &.minimal {
    &.type-http,
    &.type-https {
      .protocol {
        display: none;
      }
    }
  }
}
</style>
