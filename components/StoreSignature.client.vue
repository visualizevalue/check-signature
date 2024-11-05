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
      </TransactionFlow>
    </div>
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
</style>
