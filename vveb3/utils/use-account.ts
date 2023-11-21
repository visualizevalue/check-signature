import { computed, reactive, toRefs } from 'vue'
import {
  Connector,
  type GetNetworkResult,
  mainnet,
  getAccount,
  watchAccount,
  watchNetwork,
  type GetAccountResult,
  getNetwork,
} from '@wagmi/core'
import { getBlockExplorer, getChainName } from './chain'

const account = reactive<{
  address: `0x${string}` | undefined,
  connector: Connector<any,any> | undefined,
  isConnected: boolean,
  isConnecting: boolean,
  isDisconnected: boolean,
  isReconnecting: boolean,
  status: 'connected' | 'reconnecting' | 'connecting' | 'disconnected' | undefined,
  network: GetNetworkResult | undefined,
}>({
  address: undefined,
  connector: undefined,
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isReconnecting: false,
  status: undefined,
  network: undefined,
})

// WATCHERS
let unwatchAccount: () => void;
let unwatchNetwork: () => void;

const chain = computed(() => account.network?.chain || mainnet)
const chainId = computed<number>(() => chain.value?.id)
const blockExplorer = computed(() => getBlockExplorer(chainId.value))
const networkName = computed(() => getChainName(chainId.value) || chain.value?.name || 'Unknown Chain')

const setAccount = (result: GetAccountResult) => {
  account.address = result.address
  account.connector = result.connector
  account.isConnected = result.isConnected
  account.isConnecting = result.isConnecting
  account.isDisconnected = result.isDisconnected
  account.isReconnecting = result.isReconnecting
  account.status = result.status
}

const setNetwork = (result: GetNetworkResult) => {
  account.network = result
}

const useAccount = () => {
  setAccount(getAccount())
  setNetwork(getNetwork())

  if (! unwatchAccount) {
    unwatchAccount = watchAccount(updatedAccount => setAccount(updatedAccount))
  }

  if (! unwatchNetwork) {
    unwatchNetwork = watchNetwork(network => setNetwork(network))
  }

  return {
    ...toRefs(account),
    networkName,
    blockExplorer,
  }
}

export default useAccount
