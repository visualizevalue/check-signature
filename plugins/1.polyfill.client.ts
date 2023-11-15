import { defineNuxtPlugin } from '#app'
import buffer from 'buffer'

export default defineNuxtPlugin({
  name: 'client-polyfill',
  enforce: 'pre',
  async setup () {
    window.global = window
    window.Buffer = buffer.Buffer
  }
})
