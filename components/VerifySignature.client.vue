<template>
  <div class="verify" :class="[`valid-${valid}`]">

    <header class="status">
      <span v-if="isPrivate">
        <Icon type="eye-off" />
        <span>Private signature</span>
      </span>
      <span v-else-if="loaded">
        <Icon type="eye" />
        <span>Public signature</span>
      </span>
      <span v-if="copied">Link copied to clipboard</span>
      <Button @click="share" title="Copy URI" class="small">
        <Icon type="share" />
      </Button>
    </header>

    <section class="statement">
      <header>
        <Account :address="signer" class="signer" />

        <div class="validity">
          <p v-if="valid">checks out</p>
          <p v-else>doesn't check out</p>

          <Icon :type="valid ? 'check' : 'uncheck'" class="check" />
        </div>
      </header>

      <div class="body">
        <span v-if="signerIsSubject && singularSubject" class="subject">I</span>
        <span v-else class="subject">
          <Account
            v-for="address in subjects"
            :key="address"
            :address="address"
          />
        </span>

        <span class="action">{{ action }}</span>

        <span class="object"><SignatureObject :object="object" /></span>
      </div>
    </section>

    <div class="proof">
      <div class="input">
        <div>
          <p class="label">Subject{{ singularSubject > 1 ? 's' : '' }}</p>
          <p>
            <Address
              v-for="address in subjects"
              :key="address"
              :address="address"
            />
          </p>
        </div>
        <div>
          <p class="label">Action</p>
          <p>{{ action }}</p>
        </div>
        <div>
          <p class="label">Object</p>
          <p><SignatureObject :object="object" class="unstyled" /></p>
        </div>
      </div>
      <div>
        <div>
          <p class="label">Signer</p>
          <p><Address :address="signer" /></p>
        </div>
        <div>
          <p class="label">Signature</p>
          <p class="signature">{{ signature }}</p>
        </div>
      </div>
      <div class="help">
        <template v-if="valid">
          <Icon type="info" />
          <small>
            The message input correctly computes to the signature. This signature is valid.
          </small>
        </template>
        <template v-else>
          <Icon type="alert-triangle" />
          <small>
            The message input doesn't match the signature. This signature is invalid.
          </small>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { verifyTypedData } from 'viem'
import ipfs from '~/utils/ipfs'

const config = useRuntimeConfig()

const {
  signer,
  signature,
  subjects,
  action,
  object,
} = defineProps({
  signature: String,
  signer: String,
  subjects: Array,
  action: String,
  object: String,
})

const signerIsSubject = computed(() => subjects.includes(signer))
const singularSubject = computed(() => subjects.length === 1)

const signedDataArgs = computed(() => generateDefinition(subjects, action, object))
const valid = ref(null)

// TODO: Implement dynamic schema getter...

const verify = async () => {
  try {
    valid.value = await verifyTypedData({
      ...signedDataArgs.value,
      address: signer,
      signature,
    })
  } catch (e) {
    valid.value = false
  }
}

// Verify on load
verify()

const cid = ref(null)
const stored = ref(null)
const loaded = ref(false)
const isPrivate = computed(() => loaded.value && !stored.value)
onMounted(async () => {
  try {
    cid.value = await ipfs.addSignature({ signer, signature, subjects, action, object })
    stored.value = await $fetch(`${config.public.api}/v1/signatures/${cid.value}`)
  } catch (e) {
    //
  }

  loaded.value = true
})

const copied = ref(false)
const share = async () => {
  const url = isPrivate.value ? location.href : `https://${config.public.shortUri}/${stored.value.id}`

  if ('share' in navigator) {
    return await navigator.share({
      title: `Signature Check`,
      url,
    })
  }

  try {
    await navigator.clipboard.writeText(url)
    copied.value = true

    setTimeout(() => copied.value = false, 3_000)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="postcss" scoped>
.status {
  display: flex;
  gap: var(--padding);
  align-items: center;
  justify-content: flex-end;

  > * {
    display: flex;
    gap: var(--size-2);
    align-items: center;
    color: var(--gray-z-7);
    font-size: var(--font-sm);
    white-space: nowrap;

    .icon {
      width: var(--size-3);
      height: var(--size-3);
      color: var(--gray-z-6);
    }
  }
}

.verify {
  display: flex;
  flex-direction: column;
  padding: var(--padding-lg) 0;
  gap: var(--padding-lg);
}

.statement,
.proof {
  position: relative;
  background-color: var(--gray-z-0);
  border: var(--border-dark);
  border-radius: var(--size-2);
  border-top-left-radius: var(--size-0);
  overflow: hidden;

  > * {
    padding: var(--padding);
  }
}

.statement {
  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--size-5);
    padding: var(--size-2) var(--padding);

    :deep(.avatar) {
      margin-top: 0.2em;

      img {
        margin-top: -0.2em;
      }
    }
  }

  .body {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--size-3);
    row-gap: 0;
    font-size: var(--font-lg);
    padding-top: var(--padding);
    border-top: var(--border-dark);
    overflow: auto;
    -webkit-overflow-scrolling: auto;

    > * {
      max-width: 100%;
    }

    :deep(.uri) {
      max-width: 100%;
      overflow: hidden;
    }
  }
}

.validity {
  display: flex;
  align-items: center;
  gap: var(--size-3);
  white-space: nowrap;

  .icon {
    margin-bottom: 0.2em;
  }
}

.proof {
  display: grid;

  > * {
    display: flex;
    flex-direction: column;
    gap: var(--padding);
  }

  .input {
    border-bottom: var(--border-dark);
  }

  .help {
    flex-direction: row;
    border-top: var(--border-dark);
    display: flex;
    gap: var(--size-3);
    align-items: center;

    .icon {
      width: var(--size-4);
      height: var(--size-4);
      flex-shrink: 0;
    }

    small {
      font-size: var(--font-xs);
      line-height: 1em;
    }
  }

  @media (--md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .input {
      border-bottom: 0;
      border-right: var(--border-dark);
    }

    .help {
      grid-column: span 2;
    }
  }
}

.label {
  font-size: var(--font-sm);
  color: var(--gray-z-6);
}

p {
  word-break: break-all;
}

.valid-true {
  .validity {
    color: var(--green);
  }

  .help {
    background-color: rgba(var(--green-rgb), 0.1);
  }
}
.valid-false {
  .validity,
  .signature {
    color: var(--red);
  }

  .help {
    background-color: rgba(var(--red-rgb), 0.1);
  }
}
</style>
