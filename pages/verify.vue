<template>
  <div class="content-width">
    <VerifySignature
      :signature="signature"
      :signer="signer"
      :subjects="subjects"
      :action="action"
      :object="object"
    />
  </div>
</template>

<script setup>
const route = useRoute()

const signature = computed(() => route.query.signature)
const signer = computed(() => route.query.signer)
const subjects = computed(() => route.query.subjects?.split(',') || [])
const action = computed(() => route.query.action)
const object = computed(() => route.query.object)
</script>
