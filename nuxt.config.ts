// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      api: '',
      rpc: 'http://127.0.0.1:8545',
      alchemy: '',
      walletConnectProjectId: '',
      chainName: 'mainnet',
      chainId: '1',
    },
  },
  css: [
    '~/styles/index.css',
  ],
  $development: {
    extends: [
      import.meta.env.NUXT_VVEB3_LINK,
    ],
  },
  $production: {
    extends: [
      'github:visualizevalue-dev/vveb3-layer',
    ],
  },
})
