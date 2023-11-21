<template>
  <button @click="() => toggleDark()" title="Switch Light/Dark mode">
    <Icon v-if="isDark" key="dark" type="sun" :size="20" />
    <Icon v-else key="light" type="moon" :size="20" />
  </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>
const isDark = ref(false)

const setIsDark = () => isDark.value = mode.value === 'dark'
watch(mode, () => setIsDark())
onMounted(() => setIsDark())

const toggleDark = () => {
  mode.value = isDark.value ? 'light' : 'dark'
}
</script>
