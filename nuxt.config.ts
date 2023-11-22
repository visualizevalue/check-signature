// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    'github:visualizevalue-dev/vveb3-layer',
  ],
  runtimeConfig: {
    public: {
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
})
