export default defineAppConfig({
  myLayer: {
    name: 'vveb3'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
