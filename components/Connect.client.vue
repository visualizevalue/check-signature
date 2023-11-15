<template>
  <Connect :wallet-connect-project-id="config.public.walletConnectProjectId" :rpc="config.public.rpc" />
</template>

<script setup>
import Connect from 'vveb3/lib/components/Connect.vue'

const config = useRuntimeConfig()
</script>
