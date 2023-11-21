<template>
  <NuxtLink :to="link" :title="title">
    <slot />
  </NuxtLink>
</template>

<script setup>
import { getBlockExplorer, getTransactionLink } from '~/helpers/chain'

const {
  chain,
  hash,
} = defineProps({
  chain: [String, Number],
  hash: String,
})

const explorer = computed(() => getBlockExplorer(chain))
const link = computed(() => getTransactionLink(chain, hash))
const title = computed(() => `View on ${explorer.value.name}`)
</script>
