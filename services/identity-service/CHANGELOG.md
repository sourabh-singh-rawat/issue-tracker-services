# @pine/identity-service

## 0.4.0

### Minor Changes

- de6a3b1: feat(authz): organizations, authorization, roles, keto, and admin-web
- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- 4b72801: refactor(identity): drop local email, add profile names, register with username
- 0acc6d3: fix(identity): login returns 204/302 and OAuth redirect via response
- 7ed63fe: fix(oauth): 302 authorize redirect and require explicit DATABASE_URL env vars
- fff12b7: feat(outbox): schedule identity registration and brand create via outbox

### Patch Changes

- 5b5506b: chore(fmt): format code
- 7c958b1: feat(product): create product with default unit; publish nats now publish cloud events
- d206a7c: refactor: rename @pine/http-core to @pine/http
- 689a980: refactor: rename @pine/http to @pine/server and merge graphql-core
- Updated dependencies [de6a3b1]
- Updated dependencies [2cd5736]
- Updated dependencies [d67c1e1]
- Updated dependencies [8ae018c]
- Updated dependencies [5b5506b]
- Updated dependencies [14a1fb5]
- Updated dependencies [4b72801]
- Updated dependencies [84ae79f]
- Updated dependencies [d175229]
- Updated dependencies [fff12b7]
- Updated dependencies [04d33c3]
- Updated dependencies [7c958b1]
- Updated dependencies [d206a7c]
- Updated dependencies [689a980]
- Updated dependencies [5bd9a1a]
- Updated dependencies [179562a]
  - @pine/events@0.2.0
  - @pine/common@0.0.2
  - @pine/security@0.1.0
  - @pine/server@1.0.0
  - @pine/outbox@0.1.0

## 0.3.0

### Minor Changes

- dfa43fd: feat(inventory): add inventory-service with gateway proxy, bootstrap env modules, and OAuth token cookies
- 1ab5ff4: refactor(env): unify root .env and URL-based service bootstrap

### Patch Changes

- Updated dependencies [dfa43fd]
  - @pine/server@0.2.1

## 0.2.0

### Minor Changes

- 2f7e145: feat(identity): add OAuth consent, token exchange, and client auth flows
- d05915a: refactor: rename packages to events/http, add CloudEvents and Hydra OAuth
- 656d23b: feat(identity): add session cookies with me and logout
- c73b916: feat(identity): move registration to REST and implement Kratos login

### Patch Changes

- Updated dependencies [d05915a]
  - @pine/events@0.1.0
  - @pine/server@0.2.0
  - @pine/security@0.0.2

## 0.1.0

### Minor Changes

- 68dd71c: feat: rebuild identity on Kratos and replace gateway with api-gateway

### Patch Changes

- Updated dependencies [68dd71c]
  - @pine/common@0.0.1
  - @pine/errors@0.1.0
  - @pine/events@0.0.1
  - @pine/server@0.0.1
  - @pine/observability@0.1.0
  - @pine/orm@0.0.1
  - @pine/security@0.0.1
  - @pine/server-core@0.1.0
