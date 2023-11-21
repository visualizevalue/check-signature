<template>
  <div class="verify" :class="[`valid-${valid}`]">

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
        <span v-if="signerIsSubject && singularSubject" class="subject">"I</span>
        <span v-else class="subject">
          "<Account
            v-for="address in subjects"
            :key="address"
            :address="address"
          />
        </span>

        <span class="action">{{ action }}</span>

        <span class="object"><Object :object="object" />"</span>
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
          <p><Object :object="object" class="unstyled" /></p>
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

const {
  signature,
  signer,
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

const signedDataArgs = computed(() => notabilityCheck712Definition(subjects, action, object))
const valid = ref(null)

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
</script>

<style lang="postcss" scoped>
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
    font-size: var(--font-lg);
    padding-top: var(--padding);
    border-top: var(--border-dark);
    overflow: auto;
    -webkit-overflow-scrolling: auto;

    > * {
      white-space: nowrap;
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
  .statement,
  .proof {
    /* box-shadow: 0 0 0 var(--size-1) rgba(var(--green-rgb), 0.1); */
  }

  .validity {
    color: var(--green);
  }

  .help {
    background-color: rgba(var(--green-rgb), 0.1);
  }
}
.valid-false {
  .statement,
  .proof {
    /* box-shadow: 0 0 0 var(--size-1) rgba(var(--red-rgb), 0.1); */
  }

  .validity,
  .signature {
    color: var(--red);
  }

  .help {
    background-color: rgba(var(--red-rgb), 0.1);
  }
}
</style>
