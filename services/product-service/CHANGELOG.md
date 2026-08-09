# @pine/product-service

## 0.2.0

### Minor Changes

- 11abe4b: feat(product): add product-service with dedicated database, gateway proxy and bootstrap; add brand operations
- 8ae018c: feat(product): publish brand events; project brands and products in inventory
- fff12b7: feat(outbox): schedule identity registration and brand create via outbox
- 04d33c3: feat(product): add category create/update with events and GraphQL
- 7c958b1: feat(product): create product with default unit; publish nats now publish cloud events
- 179562a: feat(outbox): transactional outbox for product events; project product units

### Patch Changes

- 5b5506b: chore(fmt): format code
- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- 4b72801: refactor(identity): drop local email, add profile names, register with username
- 84ae79f: refactor(events): rename NATS subscribers to consumers
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

## 0.1.0

### Minor Changes

- feat(product): add product-service with dedicated database, gateway proxy, and bootstrap scaffold mirrored from inventory-service
