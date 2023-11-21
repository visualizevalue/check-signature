<template>
  <span>
    {{ display }}
    <slot />
  </span>
</template>

<script setup>
import { useEnsName } from '~/utils/use-wagmi'
import shortAddress from '~/utils/short-address'

const props = defineProps({
  address: String,
})

const address = computed(() => props.address)

const ens = useEnsName(address)

const display = computed(() => {
  if (ens.value) return ens.value

  return shortAddress(address.value)
})
</script>
