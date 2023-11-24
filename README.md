# Check Signature

Private-public key cryptography allows you to sign arbitrary messages. Anyone can take the output of such a signature and verify its validity.

By consistenly signing work, one can build a reputation-based, self-governed identity noone can take away.

With this app, you can use your Ethereum Account to sign structured statements and share them in private or publicly.

1. **Private:** Create signatures directly in your browser and share the URL. Your data is not stored on our infrastructure.
2. **Public:** Publish your signature to IPFS and our APIs to make them publicly available and indexable.
3. **Onchain (soon):** Write your signature to the blockchain and create an immutable timestamp and historical proof of your message.

## Signature Schema

The signed statements use a typed message format, including one or many `Subjects`, an `Action`, and an `Object`.
Subjects are Ethereum Accounts, Actions are structured verbs like `said` or `made`, and objects are any plain text content, or URIs to content on the internet.

```ts
const name = 'Notability Check'
const domain = {
  name,
  version: '1',
}

const types = {
  [name]: [
    { name: 'Subject', type: 'address[]' },
    { name: 'Action', type: 'string' },
    { name: 'Object', type: 'string' },
  ],
}

cnost schema = {
  primaryType: name,
  message: {
    Subject: ['0xc8f8e2F59Dd95fF67c3d39109ecA2e2A017D4c8a'],
    Action: 'said',
    Object: 'this artwork may or may not be notable',
  },
  domain,
  types,
}
```

## Running the application

### Setup

- Install dependencies `yarn install`
- Copy & Edit `.env.example` to `.env`

### Dev Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

This application is built with Nuxt. Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started).
