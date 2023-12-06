import {
  defineConfig,
  minimalPreset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimalPreset,
    maskable: {
      ...minimalPreset.maskable,
      padding: 0,
      resizeOptions: { fit: 'contain', background: 'black' }
    },
    apple: {
      ...minimalPreset.maskable,
      padding: 0,
      resizeOptions: { fit: 'contain', background: 'black' }
    },
  },
  images: ['public/signature.svg']
})
