import { mainnet, goerli, zora, Chain } from '@wagmi/chains'

export const SLUG_ID: {[key: string]: number} = {
  eth: 1,
  goerli: 5,
  zora: 7777777,
}

export const NAMES: {[key: number]: string} = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  7777777: 'Zora Network',
}

export const CHAINS: {[key: number]: Chain} = {
  1: mainnet,
  5: goerli,
  7777777: zora,
}

export const getBlockExplorer = (chain: string|number) => {
  const id = typeof chain === 'string' ? SLUG_ID[chain] : chain

  const config = CHAINS[id]
  return config?.blockExplorers?.default || {
    name: 'Etherscan',
    url: 'https://etherscan.io'
  }
}

export const getTransactionLink = (chain: string|number, hash: string) => {
  const explorer = getBlockExplorer(chain)

  return `${explorer.url}/tx/${hash}`
}

export const getChainName = (chain: string|number) => {
  const id = typeof chain === 'string' ? SLUG_ID[chain] : chain

  return NAMES[id] || CHAINS[id]?.name
}
