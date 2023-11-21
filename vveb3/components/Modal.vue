<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <dialog v-if="open" ref="modal" :class="[modalClasses]">
        <header v-if="title">
          <h1>{{ title }}</h1>
          <button @click="$emit('close')" class="close"><Icon type="x" /></button>
          <slot name="header" />
        </header>
        <section>
          <slot />
        </section>
        <footer>
          <slot name="footer" />
        </footer>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  open: Boolean,
  clickOutside: {
    type: Boolean,
    default: true,
  },
  title: String,
  modalClasses: String,
})

defineEmits(['close'])

const modal = ref(null)
watch(() => props.open, () => {
  if (props.open) {
    nextTick(() => {
      modal.value?.showModal()
    })
  }
})
</script>

<style lang="postcss" scoped>
dialog {
  padding: 0;
  transition: all var(--speed);
  min-width: min(24rem, 90vw);

  > * {
    padding: 0 var(--size-4);

    &:first-child,
    &:last-child {
      padding-top: var(--size-4);
      padding-bottom: var(--size-4);
    }
  }

  header {
    width: 100%;
    position: relative;
    button.close {
      position: absolute;
      top: var(--size-4);
      right: var(--size-4);
      width: var(--size-4);
      height: var(--size-4);
    }
  }

  &::backdrop {
    background-color: var(--semi);
    backdrop-filter: blur(var(--size-1));
    opacity: 1;
    transition: all var(--speed);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all var(--speed) ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(var(--size-5)) scale(0.9);

  &::backdrop {
    opacity: 0;
  }
}
</style>
