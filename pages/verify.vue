<template>
  <div class="content-width full-height">
    <VerifySignature
      :signature="signature"
      :signer="signer"
      :subjects="subjects"
      :action="action"
      :object="object"
    />

    <ClientOnly>
      <AboutSignatureVerificationPreview />
    </ClientOnly>
  </div>
</template>

<script setup>
const route = useRoute()

const signature = computed(() => route.query.signature)
const signer = computed(() => route.query.signer)
const subjects = computed(() => route.query.subjects?.split(',') || [])
const action = computed(() => route.query.action)
const object = computed(() => route.query.object)

useMetaData({
  title: 'Check Signature',
  description: 'Verify whether a signature is valid.',
})
</script>

<style lang="postcss" scoped>
aside {
  padding: 0 var(--padding) var(--size-8);
  opacity: 0.33;
  transition: all var(--speed);

  :deep(> *:not(h1)) {
    opacity: 0.5;
    transition: all var(--speed);
  }

  :deep(a) {
    color: var(--color);
  }

  &:hover {
    opacity: 1;

    :deep(> *:not(h1)) {
      opacity: 1;
    }

    :deep(a) {
      color: var(--primary);
    }
  }
}
</style>
