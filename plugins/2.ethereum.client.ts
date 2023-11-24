import { mainnet } from '@wagmi/chains'
import { createConfig, configureChains, InjectedConnector } from '@wagmi/core'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { publicProvider } from '@wagmi/core/providers/public'
import { defineNuxtPlugin } from '#app'

const setup = ({
  alchemyApiKey,
  walletConnectProjectId,
}: {
  alchemyApiKey: string,
  walletConnectProjectId: string,
}) => {
  const { chains, publicClient } = configureChains(
    [mainnet],
    [
      alchemyProvider({ apiKey: alchemyApiKey }),
      publicProvider(),
    ],
    {
      batch: { multicall: true },
      pollingInterval: 60_000,
    }
  )

  const wagmi = createConfig({
    autoConnect: true,
    connectors: [
      new InjectedConnector({ chains }),
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: walletConnectProjectId,
        },
      }),
    ],
    publicClient,
  })

  return {
    chains,
    publicClient,
    wagmi
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const { wagmi } = setup({
    alchemyApiKey: config.public.alchemy,
    walletConnectProjectId: config.public.walletConnectProjectId,
  })

  // @ts-ignore
  window.wagmi = wagmi

  return {
    provide: {
      wagmi
    }
  }
})
