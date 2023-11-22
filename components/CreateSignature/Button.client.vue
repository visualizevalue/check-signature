<template>
  <Button
    @click="sign"
    :disabled="signing || !object"
  >
    <Icon type="feather" />
    <span v-if="signing">Signing</span>
    <span v-else>Sign</span>
  </Button>
</template>

<script setup>
import { signNotabilityCheck } from '~/utils/sign'

const props = defineProps({
  peers: Array,
  action: String,
  object: String,
})

const router = useRouter()

const { address, isConnected } = useAccount()

const action = computed(() => props.action)
const object = computed(() => props.object)
const subjects = computed(() => [address.value, ...props.peers])

const signing = ref(false)
const sign = async () => {
  if (! isConnected.value) {
    return document.getElementById('main-connect').click()
  }

  try {
    signing.value = true

    const signature = await signNotabilityCheck(
      subjects.value,
      action.value,
      object.value,
    )

    router.push({
      path: '/verify',
      query: {
        subjects: subjects.value.join(','),
        action: action.value,
        object: object.value,
        signer: address.value,
        signature,
      },
    })
  } catch (e) {
    // ...
    console.log(e)
  }

  signing.value = false
}
</script>
