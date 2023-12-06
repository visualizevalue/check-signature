// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@vite-pwa/nuxt',
  ],
  app: {
    head: {
      title: 'Signature Check',
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
        },
        { name: 'title', content: 'Signature Check' },
        { name: 'description', content: 'Create and verify statements created with Ethereum Accounts.' },
        { property: 'og:title', content: 'Signature Check' },
        { property: 'og:description', content: 'Create and verify statements created with Ethereum Accounts.' },
        { property: 'og:image', content: 'https://signature.vv.xyz/OG.png' },
        { name: 'theme-color', content: '#000000' },
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
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-512x512.png',
          sizes: '512x512',
        },
        {
          rel: 'mask-icon',
          href: '/vv.svg',
          color: '#000000',
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
      shortUri: 's.vv.xyz',
      appUri: 'signature.vv.xyz',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/verify': { prerender: true },
    '/**': { prerender: false, ssr: false },
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
