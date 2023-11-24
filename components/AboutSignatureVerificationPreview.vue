<template>
  <aside class="prose small">
    <h1>
      <span>How does this work?</span>
      <Icon type="chevron-right" />
    </h1>
    <p>Private-public key cryptography allows one to sign arbitrary messages. Anyone can take the output of such a signature and verify its validity.</p>
    <p>With this app, one can use an Ethereum Account to sign structured messages and share them in private or publicly.</p>
    <p>The above statement signature uses a typed message format, including one or many <code>Subjects</code>, an <code>Action</code>, and an <code>Object</code>.</p>
    <p>Subjects are Ethereum Accounts, Actions are structured verbs like "said" or "made", and objects are any plain text content, or URIs to content on the internet.</p>
    <p><NuxtLink to="https://github.com/visualizevalue-dev/check-signature#readme">Read more</NuxtLink></p>
  </aside>
</template>
