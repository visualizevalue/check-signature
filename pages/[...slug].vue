<template>
  <div v-if="index" class="full-height">
    <aside>
      <div class="content-width">
        <CreateSignatureForm />
      </div>
    </aside>

    <div class="content-width">
      <ClientOnly>
        <PaginatedContent :url="url"
          v-slot="{ items }"
          class="timeline"
        >
          <SignatureListItem
            v-for="signature in items"
            :key="signature.cid"
            :signature="signature"
          />
        </PaginatedContent>
      </ClientOnly>
    </div>
  </div>
  <div v-else class="full-height loading">
    <Loader />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()

const index = computed(() => route.path === '/')

// Handle redirect
if (! index.value) {
  try {
    const signature = await $fetch(`${config.public.api}/v1/signatures/${route.params.slug}`)

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
}

const url = `${config.public.api}/v1/signatures`

useMetaData({
  title: 'Signature Check',
  description: 'Create and verify statements created with Ethereum Accounts.',
})
</script>

<style lang="postcss" scoped>
aside {
  border-bottom: var(--border-dark);
}

.timeline {
  padding: var(--size-9) 0 calc(var(--size-9)*2);
  display: grid;
  gap: var(--padding);
}

.loading {
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
