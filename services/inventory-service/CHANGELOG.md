# @pine/inventory-service

## 0.3.0

### Minor Changes

- 8ae018c: feat(product): publish brand events; project brands and products in inventory
- fff12b7: feat(outbox): schedule identity registration and brand create via outbox
- 179562a: feat(outbox): transactional outbox for product events; project product units

### Patch Changes

- 11abe4b: feat(product): add product-service with dedicated database, gateway proxy and bootstrap; add brand operations
- 5b5506b: chore(fmt): format code
- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- 9c0d187: feat(web): merge issues-web and inventory-web into a single erp-web app

  Product UI lives in `@pine/erp-web` (port 3001) with OIDC PKCE auth and an inventory route shell. Backend CORS and invite URLs use `ERP_WEB_URL` instead of separate issues/inventory web origins.

- 84ae79f: refactor(events): rename NATS subscribers to consumers
- 7ed63fe: fix(oauth): 302 authorize redirect and require explicit DATABASE_URL env vars
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

## 0.2.0

### Minor Changes

- dfa43fd: feat(inventory): add inventory-service with gateway proxy, bootstrap env modules, and OAuth token cookies
- 1ab5ff4: refactor(env): unify root .env and URL-based service bootstrap

### Patch Changes

- Updated dependencies [dfa43fd]
  - @pine/server@0.2.1
