<template>
  <NuxtLink
    v-if="type === 'URI'"
    :to="isIPFS ? gatewayURI : object"
    target="_blank"
    class="uri"
    :class="[`type-${protocol}`]"
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
import { getType } from '~/helpers/sign'

const { object } = defineProps({ object: String })

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
  display: inline-flex;
  padding: var(--size-2);
  background-color: var(--gray-z-2);
  border-radius: var(--size-2);
  transition: all var(--speed);

  .protocol,
  .path,
  .search,
  .hash {
    color: var(--gray-z-6);
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
}
</style>
