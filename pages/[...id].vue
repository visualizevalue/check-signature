<template>
  <div class="full-height">
    <Loader />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()

try {
  const signature = await $fetch(`${config.public.api}/v1/signatures/${route.params.id}`)

  router.replace({
    path: '/verify',
    query: {
      subjects: signature.subjects.join(','),
      action: signature.action,
      object: signature.object,
      signer: signature.signer,
      signature: signature.signature,
    }
  })
} catch (e) {
  console.error(e)
  router.replace('/')
}
</script>

<style lang="postcss" scoped>
.full-height {
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: var(--size-8);
    height: var(--size-8);
    margin-bottom: var(--size-8);
  }
}
</style>
