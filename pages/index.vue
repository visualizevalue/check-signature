<template>
  <div class="full-height">
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
</template>

<script setup>
const config = useRuntimeConfig()

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
</style>
