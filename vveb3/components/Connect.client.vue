<template>
  <Button v-if="! isConnected" @click="chooseWallet = true" id="main-connect">
    <slot>Check-In</slot>
  </Button>
  <Button @click="onAccountClick" v-else>
    <Account :address="address" class="connected">
      <template #appendix>
        <small class="muted">{{ networkName }}</small>
      </template>
    </Account>
  </Button>

  <Modal
    :open="chooseWallet"
    @close="chooseWallet = false"
    title="Connect Wallet"
  >
    <ChooseWallet :wallet-connect-project-id="walletConnectProjectId" :rpc="rpc" @closeContext="chooseWallet = false" />
  </Modal>

  <Modal
    :open="chooseNetwork"
    @close="chooseNetwork = false"
    title="Choose Network"
  >
    <ChooseNetwork @switched="chooseNetwork = false" />
  </Modal>
</template>

<script setup>
const {
  walletConnectProjectId,
  rpc,
  onAccountClick,
} = defineProps({
  walletConnectProjectId: String,
  rpc: String,
  onAccountClick: {
    type: Function,
    default: () => null,
  }
})
const emit = defineEmits(['connected'])

const { address, isConnected, networkName } = useAccount()

const chooseWallet = ref(false)
watch(isConnected, () => {
  chooseWallet.value = false
})

const chooseNetwork = ref(false)
watch(isConnected, () => {
  chooseNetwork.value = false
})
</script>

<style lang="postcss" scoped>
  a,
  button {
    display: flex;
  }

  .balance {
    display: flex;
    flex-direction: column;
    line-height: 1;
    text-align: left;
    margin-left: auto;
    padding-left: var(--size-2);
    border-left: var(--border);

    :deep(> span) {
      font-size: 80%;
      color: var(--gray-z-6);
    }

    @media (--sm) {
      margin-left: var(--size-2);
    }
  }
</style>
