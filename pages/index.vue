<template>
  <div class="index full-height">
    <div class="content-width">
      <CreateSignatureForm />
    </div>

    <section>
      <div class="content-width">
        <TimelinePreview />

        <AboutPreview />
      </div>
    </section>
  </div>
</template>

<script setup>
useMetaData({
  title: 'Signature Check',
  description: 'Create and verify statements created with Ethereum Accounts.',
})
</script>

<style lang="postcss" scoped>
  .index {
    display: grid;

    > * {
      width: 100%;
    }

    > *:first-child {
      padding: var(--padding) var(--padding) var(--size-7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > * {
        width: 100%;
      }
    }

    > *:last-child {
      border-top: var(--border-dark);

      > .content-width {
        display: grid;
        height: 100%;
        padding: 0;

        > * {
          padding: var(--padding-lg) var(--padding);
        }

        @media (--md) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          padding: 0 var(--padding);

          > * {
            padding: var(--padding-lg);

            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
    }
  }

  .about {
    border-top: var(--border-dark);

    @media (--md) {
      border-top: 0;
      border-left: var(--border-dark);
    }
  }
</style>
