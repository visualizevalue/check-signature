<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="white" :height="3" />

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(() => {
  // Redirect short URI to readable URI
  if (window.location.host.startsWith('s.')) window.location.replace(window.location.href.replace('s.', 'signature.'))
})
</script>
