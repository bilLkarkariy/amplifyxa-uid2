# @amplifyxa/uid2

UID2 hashing library for AmplifyXA services.

## Features

- `hash(email, salt)` – deterministic Base64URL-encoded UID2 per IAB spec.
- `verify(email, uid2, salts[])` – check UID2 against current & historic salts.
- Salt rotation helper `npm run rotate` (1M buckets).
- Tiny CLI `npx uid2 hash you@mail.com` / `verify` / `rotate`.
- Written in TypeScript, Node 18+, fully ESM.
- 100 % test coverage on core.

## Install

Add as Git dependency until public registry publish:

```sh
pnpm add "@amplifyxa/uid2@git+ssh://git@github.com/bilLkarkariy/amplifyxa-uid2.git#v0.1.0"
```

## Usage

```ts
import { hash, verify } from '@amplifyxa/uid2';
import salts from '@amplifyxa/uid2/salts/current.json' assert { type: 'json' };

const uid = hash('user@example.com', salts[new Date().getDay().toString()]);
const ok = verify('user@example.com', uid, Object.values(salts));
```

CLI:

```sh
npx uid2 hash user@example.com   # prints UID2
npx uid2 verify user@example.com <uid2>
```

## Development

```sh
pnpm install
pnpm run rotate    # generate salts/current.json
pnpm test          # jest + coverage
pnpm run lint      # eslint + security
pnpm run build     # tsc -> dist
```

CI workflow (`.github/workflows/ci.yml`) lints, tests, builds on every PR.
Semantic-release auto-tags and updates CHANGELOG on `main`.

## License

MIT © AmplifyXA
