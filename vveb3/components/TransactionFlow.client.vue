<template>
  <slot :start="start" name="start"></slot>

  <Modal
    :open="open"
    @close="open = false"
    :click-outside="false"
    :x-close="false"
  >
    <section class="flow-content">
      <div>
        <IconsInfinityFlower v-if="step !== 'complete'" class="spin-infinite" :thickness="2" />
        <h1 v-if="text.title[step]">{{ text.title[step] }}</h1>
        <p>{{ text.lead[step] }}</p>
        <p v-if="step === 'waiting'"><a :href="txLink" target="_blank" class="link">Check on {{ blockExplorer.name }}</a></p>
        <p v-if="error">{{ error }}</p>
      </div>

      <slot :name="step" :close="close"></slot>

      <div v-if="step === 'confirm'" class="actions">
        <Button @click="open = false">Cancel</Button>
        <Button @click="() => initializeRequest()">{{ text.action[step] }}</Button>
      </div>
    </section>
  </Modal>
</template>

<script setup>
import { waitForTransaction } from '@wagmi/core'
import { delay } from '~/helpers/time'

const props = defineProps({
  text: {
    type: Object,
    default: {
      title: {
        confirm: '[[Really?]]',
      },
      lead: {
        confirm: '[[Do you really?]]'
      },
      action: {
        confirm: '[[Do!]]',
      }
    },
  },
  request: Function, // that returns a hash
  delayAfter: {
    type: Number,
    default: 6_000,
  },
  skipConfirmation: Boolean,
})

const emit = defineEmits(['complete'])

const open = ref(false)

const requesting = ref(false)
const waiting = ref(false)
const complete = ref(false)
const error = ref('')
const tx = ref(null)
const receipt = ref(null)
const { network } = useAccount()
const blockExplorer = computed(() =>
  network.value.chain.blockExplorers?.default || {
    name: 'Etherscan',
    url: 'https://etherscan.io'
  }
)
const txLink = computed(() => `${blockExplorer.value.url}/tx/${tx.value}`)

const step = computed(() => {
  if (
    open.value &&
    !requesting.value &&
    !waiting.value &&
    !complete.value
  ) {
    return 'confirm'
  }

  if (requesting.value) {
    return 'requesting'
  }

  if (waiting.value) {
    return 'waiting'
  }

  if (complete.value) {
    return 'complete'
  }

  return 'error'
})

const initializeRequest = async () => {
  error.value = ''
  tx.value = null
  receipt.value = null

  if (requesting.value) return

  try {
    requesting.value = true
    tx.value = await props.request()
    requesting.value = false
    waiting.value = true
    const [txReceipt] = await Promise.all([
      waitForTransaction({ hash: tx.value }),
      delay(6_000),
    ])
    await delay(props.delayAfter)
    receipt.value = txReceipt
    emit('complete', txReceipt)
    complete.value = true
  } catch (e) {
    console.error(e)
    // if (e?.code === 'ACTION_REJECTED') {
    //   open.value = false
    // } else {
    // }
    error.value = e.shortMessage || 'Something went wrong.'
  }

  requesting.value = false
  waiting.value = false
}

const start = () => {
  if (props.skipConfirmation && !open.value) {
    initializeRequest()
  }

  open.value = true
}

const close = () => {
  open.value = false
}

defineExpose({
  open,
  close,
  start,
})
</script>

<style lang="postcss" scoped>
  .flow-content {
    > *:first-child {
      margin-top: var(--size-6);
    }

    > *:last-child:not(.actions) {
      margin-bottom: var(--size-6);
    }
  }

  .spin-infinite {
    margin: calc(-1 * var(--size-4)) 0 var(--size-3) 0;
    width: var(--size-9);
    margin-left: auto;
    margin-right: auto;
    color: var(--gray-z-8);
  }

  h1 {
    font-size: var(--font-lg);
    margin-bottom: var(--size-4);
    text-align: center;
  }

  p {
    width: 100%;
    text-align: center;
    color: var(--gray-z-6);

    + p {
      margin-top: var(--size-1);
    }

    a {
      text-decoration: underline;

      &:--highlight {
        color: var(--gray-z-9);
      }
    }
  }

  .actions,
  :deep(.actions) {
    display: flex;
    justify-content: center;
    gap: var(--size-4);
  }
</style>
