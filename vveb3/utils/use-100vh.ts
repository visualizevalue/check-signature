import { watch, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'


const use100vh = () => {
  const { height } = useWindowSize()

  const setHeight = () => document.documentElement.style.setProperty('--100vh', `${height.value}px`)
  watch(height, setHeight)
  onMounted(setHeight)
}

export default use100vh
