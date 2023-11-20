<template>
  <aside class="about prose">
    <h1>How It Works</h1>
    <p>Private-public key cryptography allows you to sign arbitrary messages. Anyone can take the output of such a signature and verify its validity.</p>
    <p>With this app, you can use your Ethereum Account to sign structured messages and share them in private or publicly.</p>
    <!-- <p>By consistenly signing work, you build a reputation based identity noone can take away from you.</p> -->
    <ol>
      <li><span class="list-head">Private:</span> Create signatures directly in your browser and share the URL. Your data is not stored on our infrastructure.</li>
      <li><span class="list-head">Public:</span> Publish your signature to IPFS and our APIs to make them publicly available and indexable.</li>
      <li><span class="list-head">Onchain:</span> Write your signature to the blockchain and create an immutable timestamp and historical proof of your message.</li>
    </ol>
  </aside>
</template>

<style lang="postcss" scoped>
h1, p, ol {
  margin: 0.75rem 0;
}

h1 {
  font-size: var(--font-base);
}

p,
ol,
li {
  font-size: var(--font-sm);
  line-height: 1.25em;
}

li {
  color: var(--gray-z-6);

  .list-head {
    color: var(--color);
  }
}
</style>
