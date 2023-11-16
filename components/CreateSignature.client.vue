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

    <Button @click="sign"><Icon type="feather" /> <span>Sign</span></Button>
  </section>
</template>

<script setup>
import { OPTIONS, getType, isURI,  signNotabilityCheck } from '~/helpers/sign'
import { useAccount } from 'vveb3/lib/utils/use-wagmi'

const action = ref(OPTIONS.SAID)
const object = ref('')
const type = computed(() => getType(object.value))
const peers = ref([])

const { address } = useAccount()

const extended = ref(false)
const helpTxt = computed(() => ! object.value
  ? 'text or link (https:// | ipfs://)'
  : isURI(type.value)
    ? `${object.value.split(':')[0]} link`
    : `plain text`
)

const signing = ref(false)
const sign = async () => {
  try {
    signing.value = true

    const signature = await signNotabilityCheck({
      action: action.value,
      content: object.value,
      peers: [address.value],
    })

    console.log(signature)
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
  justify-content: center;
  gap: var(--size-5);
  padding: var(--size-9) 0;

  * {
    text-transform: uppercase;
  }

  .object {
    width: auto;
    position: relative;

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
