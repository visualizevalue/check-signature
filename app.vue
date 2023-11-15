<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="white" :height="3" />

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'

const { height } = useWindowSize()

const setHeight = () => document.documentElement.style.setProperty('--100vh', `${height.value}px`)
watch(height, setHeight)
onMounted(setHeight)
</script>
