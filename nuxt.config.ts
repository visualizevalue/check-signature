import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          resolve(__dirname, './node_modules/vveb3/lib/styles/custom-media.css'),
          resolve(__dirname, './node_modules/vveb3/lib/styles/custom-selectors.css'),
        ],
      },
      'postcss-preset-env': {
        stage: 1,
        features: {
          'nesting-rules': {
            noIsPseudoSelector: false,
          }
        }
      }
    }
  },
  vite: {
    esbuild: {
      minifyIdentifiers: false
    },
  },
})
