import { defineNuxtPlugin } from '#app'

import setup from 'vveb3/lib/setup-wagmi'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const { wagmi } = setup({
    alchemyApiKey: config.public.alchemy,
    walletConnectProjectId: config.public.walletConnectProjectId,
  })

  window.wagmi = wagmi

  return {
    provide: {
      wagmi
    }
  }
})
