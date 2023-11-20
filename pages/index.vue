<template>
  <div class="index full-height">
    <div class="content-width">
      <CreateSignature />
    </div>

    <section>
      <div class="content-width">
        <!-- <div class="timeline"></div> -->

        <AboutPreview />
      </div>
    </section>
  </div>
</template>

<script setup>
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

        > * {
          padding: var(--padding-lg) var(--padding);
        }

        @media (--md) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    }
  }

  .about {
    grid-column: 1 / -1;
  }

  .timeline {
    border-top: var(--border-dark);

    @media (--md) {
      border-top: 0;
      border-right: var(--border-dark);
    }
  }
</style>
