<template>
  <span class="small upper" :class="{ avatar }">
    <img v-if="!hideAvatar && avatar" :src="avatar" />
    <Address :address="address">
      <slot name="appendix" />
    </Address>
  </span>
</template>

<script setup>
import { useEnsName, useEnsAvatar } from '~/utils/use-wagmi'

const props = defineProps({
  address: String,
  hideAvatar: Boolean,
})

const address = computed(() => props.address)

const ens = useEnsName(address)
const avatar = useEnsAvatar(ens)
</script>

<style lang="postcss" scoped>
span {
  display: inline-flex;
  align-items: center;
  gap: var(--size-3);
  height: 100%;

  img {
    width: var(--size-6);
    height: var(--size-6);
    border-radius: 50%;
    align-self: center;
    margin-left: -0.2rem;
  }

  > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    gap: 0;
    line-height: 1;

    :deep(small) {
      display: block;
    }
  }
}
</style>
