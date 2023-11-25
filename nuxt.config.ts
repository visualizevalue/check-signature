// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0'
        }
      ],
      link: [
        {
          href: '/favicon.png',
          rel: 'shortcut icon',
          type: 'image/png',
        },
        {
          href: '/favicon.png',
          rel: 'apple-touch-icon',
        },
      ],
    }
  },
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
  generate: {
    routes: [
      '/id',
    ],
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
