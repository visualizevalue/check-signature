<template>
  <Button
    @click="sign"
    :disabled="signing || !object"
  >
    <Icon type="feather" />
    <span v-if="signing">Signing</span>
    <span v-else>Sign</span>
  </Button>

  <Modal
    :open="open"
    :title="title"
    :click-outside="false"
    :modal-classes="'foo'"
  >
    <div v-if="requesting" class="centered">
      <Loader />
      <p>Requesting your signature...</p>
    </div>
    <div v-else-if="signing" class="centered">
      <Loader />
      <p>Signing your statement...</p>
    </div>
    <div v-else-if="signed">
      <div class="centered">
        <Icon type="check" />
        <p>Signing succesful!</p>
      </div>
      <p>Do you want to publish your statement?</p>
    </div>

    <template #footer v-if="signed">
      <footer>
        <Button class="secondary" :to="{ path: '/verify', query }">Keep private</Button>
        <Button class="primary" @click="publish">Publish</Button>
      </footer>
    </template>
  </Modal>
</template>

<script setup>
import { signNotabilityCheck } from '~/utils/sign'

const props = defineProps({
  peers: Array,
  action: String,
  object: String,
})

const config = useRuntimeConfig()
const router = useRouter()

const { address, isConnected } = useAccount()

const action = computed(() => props.action)
const object = computed(() => props.object)
const subjects = computed(() => [address.value, ...props.peers])

const open = ref(false)
const requesting = ref(false)
const signing = ref(false)
const publishing = ref(false)
const signature = ref(null)
const signed = computed(() => !! signature.value)
const title = computed(() => {
  if (requesting.value) {
    return `Requesting Signature...`
  }

  if (signing.value) {
    return `Signing Statement...`
  }

  if (signed.value) {
    return `Publish Statement?`
  }

  if (publishing.value) {
    return `Publishing Statement`
  }

  return `Signature Check`
})
const sign = async () => {
  if (! isConnected.value) {
    return document.getElementById('main-connect').click()
  }

  try {
    open.value = true
    signing.value = true
    requesting.value = true

    signature.value = await signNotabilityCheck(
      subjects.value,
      action.value,
      object.value,
    )

    requesting.value = false
  } catch (e) {
    // ...
    console.error(e)
    open.value = false
  }

  signing.value = false
  requesting.value = false
}

const query = computed(() => ({
  subjects: subjects.value.join(','),
  action: action.value,
  object: object.value,
  signer: address.value,
  signature: signature.value,
}))
const goToDetail = () => {
  router.push({
    path: '/verify',
    query: query.value,
  })
}

const publish = async () => {
  publishing.value = true
  try {
    await $fetch(`${config.public.api}/v1/signatures`, {
      method: 'POST',
      body: JSON.stringify({
        subjects: subjects.value,
        action: action.value,
        object: object.value,
        signer: address.value,
        signature: signature.value,
      }),
    })

    goToDetail()
  } catch (e) {
    // ...
    console.error(e)
  }

  publishing.value = false
}

</script>

<style lang="postcss" scoped>
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--padding);

  .icon {
    width: var(--size-8);
    height: var(--size-8);
  }
}

footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: var(--padding);
  gap: var(--padding);
  border-top: var(--border-dark);
}
</style>
