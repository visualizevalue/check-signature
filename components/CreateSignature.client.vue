<template>
  <section :class="[`theme-${action}`]">
    <Icon type="check" class="check" />

    <span>I</span>

    <select class="input" v-model="action">
      <option
        v-for="(option, key) in OPTIONS"
        :key="key"
      >{{ option }}</option>
    </select>

    <Input placeholder="this..." class="object" v-model="object">
      <template #after>
        <small>{{ helpTxt }}</small>
      </template>
    </Input>

    <template v-if="extended">
      <span>with</span>
      <Input placeholder="JCKBTCHR.ETH" />
    </template>

    <Button
      @click="sign"
      :disabled="signing || !object"
    >
      <Icon type="feather" />
      <span v-if="signing">Signing</span>
      <span v-else>Sign</span>
    </Button>
  </section>
</template>

<script setup>
import { OPTIONS, getType, isURI, signNotabilityCheck } from '~/utils/sign'

const router = useRouter()
const { address, isConnected } = useAccount()

const action = ref(OPTIONS.SAID)
const object = ref('')
const type = computed(() => getType(object.value))
const peers = ref([])
const subjects = computed(() => [address.value, ...peers.value])

const extended = ref(false)
const helpTxt = computed(() => ! object.value
  ? 'text or link (https:// | ipfs://)'
  : isURI(type.value)
    ? `${object.value.split(':')[0]} link`
    : `plain text`
)

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

<style lang="postcss" scoped>
section {
  --primary: var(--primary);

  font-size: var(--font-lg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: var(--size-5);
  padding: var(--size-9) 0;

  * {
    text-transform: uppercase;
    flex: 0 0 auto;
  }

  .object {
    width: auto;
    position: relative;
    flex: 3 0 auto;

    small {
      position: absolute;
      font-size: var(--font-xs);
      color: var(--gray-z-4);
      bottom: -1.5em;
      opacity: 0;
      pointer-events: none;
      left: var(--size-4);
      transition: all var(--speed);
    }

    :deep(textarea) {
      width: 100%;

      &:focus,
      &:active {
        + small {
          bottom: -1.9em;
          opacity: 1;
        }
      }
    }
  }

  .check {
    color: var(--primary);
    width: var(--size-6);
    height: var(--size-6);
  }

  > .button {
    /* justify-self: flex-end; */
  }
}

.theme-said {
  --primary: var(--color-said);
}
.theme-made {
  --primary: var(--color-made);
}
.theme-approve {
  --primary: var(--color-approve);
}
.theme-disapprove {
  --primary: var(--color-disapprove);
}
</style>
