import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    resolve('./assets/css/index.css'),
  ],
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          resolve('./assets/css/custom-media.css'),
          resolve('./assets/css/custom-selectors.css'),
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
