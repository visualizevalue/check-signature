<template>
  <div class="sign-mark">
    <DrawSignature ref="sign" />

    <Button v-if="sign?.hasPoints" @click="clear" class="clear small" title="Clear">
      <Icon type="trash" />
    </Button>

    <div class="actions">
      <TransactionFlow
        :request="inscribe"
        :text="{
          title: {
            confirm: 'Confirm transaction',
            requesting: 'Requesting inscription approval',
            waiting: 'Checking transaction',
            complete: 'Inscription successful',
          },
          lead: {
            confirm: '',
            requesting: 'Please check your wallet for a transaction request.',
            waiting: 'Waiting for the transaction to be included on the blockchain.',
            complete: 'Congratulations, your signature is now stored on Ethereum!',
          },
          action: {
            confirm: 'Inscribe',
          }
        }"
        skip-confirmation
      >
        <template v-slot:start="{ start }">
          <Button v-if="isConnected" @click="() => start()">
            <Icon type="feather" />
            <span>Inscribe</span>
          </Button>
          <Connect v-else />
        </template>

        <template v-slot:complete="{ close }">
          <div class="actions">
            <Button @click="() => close()">Ok</Button>
          </div>
        </template>
      </TransactionFlow>
    </div>

    <hr>

    <aside class="prose small">
      <h1>
        <span>How this works</span>
        <Icon type="chevron-right" />
      </h1>
      <p>This stores your signature in the
        <NuxtLink
          to="https://etherscan.io/address/0xDE04A2537f84C8176f1B3F624405419a1E28C3F0"
        >"SignatureRepository" smart contract</NuxtLink> on Etheruem.</p>
      <p>Note, there is no way to delete these signatures from the blockchain. They are public andwill stay live forever.</p>
      <p>No tokens are minted in the process of inscribing signatures.</p>
    </aside>
  </div>
</template>

<script setup>
import { toHex } from 'viem/utils'
import { writeContract } from '@wagmi/core'

const { isConnected } = useAccount()

const sign = ref()
const svgPath = ref('')

const clear = () => sign.value.clear()

const inscribe = async () => {
  const svg = sign.value.export()
  const minified = roundPathData(svg)
  svgPath.value = minified

  const { hash } = await writeContract({
    address: `0xDE04A2537f84C8176f1B3F624405419a1E28C3F0`,
    chain: 1,
    // address: `0xf0cb6e8FfcF2539f8a909bDB296b7D0B3887A3AD`,
    // chain: 17000,
    abi: SIGNATURE_REPOSITORY_ABI,
    functionName: `addSignature`,
    args: [[toHex(new TextEncoder().encode(minified))]]
  })

  return hash
}
</script>

<style scoped>
.sign-mark {
  display: grid;
  gap: var(--size-4);
  grid-auto-rows: min-content;
  width: 100%;
  max-width: 512px;
  position: relative;
  margin: 0 auto;
}

.clear {
  position: absolute;
  top: var(--size-4);
  right: var(--size-4);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--size-4);
}

hr {
  margin: calc(var(--padding-lg) - var(--size-4)) 0;
}

.prose {
  h1 {
    margin: 0 0 1em;
  }
}
</style>
