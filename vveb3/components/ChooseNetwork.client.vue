<template>
  <div>
    <button @click="switchTo(1)" :disabled="network.chain.id === 1" >
      <span>
        Ethereum <span class="muted">(Mainnet)</span>
      </span>
    </button>
    <button @click="switchTo(5)" :disabled="network.chain.id === 5" >
      <span>
        Goerli <span class="muted">(Testnet)</span>
      </span>
    </button>
    <button @click="switchTo(7777777)" :disabled="network.chain.id === 7777777" >
      Zora
    </button>
  </div>
</template>

<script setup>
import { switchNetwork } from '@wagmi/core'

const emit = defineEmits(['switched'])
const { network } = useAccount()

const switchTo = async chainId => {
  await switchNetwork({ chainId })

  emit('switched')
}
</script>

<style lang="postcss" scoped>
  div {
    display: flex;
    flex-direction: column;
    gap: var(--size-4);

    @media (--md) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  button {
    width: 100%;
    padding: var(--size-3);
    text-transform: uppercase;
    border: var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
    transition: all var(--speed);
    background: var(--gray-z-1);
    font-weight: var(--font-weight-bold);
    border: var(--border-dark);
    border-radius: var(--size-3);
    border-top-left-radius: var(--size-1);

    img {
      height: 4.5rem;
      margin-bottom: var(--size-4);
    }

    &:--highlight {
      background-color: var(--gray-z-3);
    }

    &[disabled]:not([disabled=false]) {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  aside {
    text-align: center;
    grid-column: 1 / -1;
    padding: var(--size-2) var(--size-3);
    border: var(--border);
    border-color: var(--red);
    background: var(--red);
  }
</style>
