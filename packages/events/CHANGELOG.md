# @pine/events

## 0.3.0

### Minor Changes

- 617eacc: feat(platform): identities and graph membership relations
- b0911f8: feat(platform): members and roles for platform, tenant, and organization

### Patch Changes

- Updated dependencies [617eacc]
- Updated dependencies [1dd2bfb]
  - @pine/common@0.0.3
  - @pine/server@1.0.1

## 0.2.0

### Minor Changes

- de6a3b1: feat(authz): organizations, authorization, roles, keto, and admin-web
- 2cd5736: refactor(authz): role capabilities model, drop permissions
- 8ae018c: feat(product): publish brand events; project brands and products in inventory
- 4b72801: refactor(identity): drop local email, add profile names, register with username
- 84ae79f: refactor(events): rename NATS subscribers to consumers
- d175229: refactor(notification): remove email sending, events, and emails table
- 04d33c3: feat(product): add category create/update with events and GraphQL
- 7c958b1: feat(product): create product with default unit; publish nats now publish cloud events
- 179562a: feat(outbox): transactional outbox for product events; project product units

### Patch Changes

- d67c1e1: feat(authz): sync keto relationship tuples on role capability updated event
- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- fff12b7: feat(outbox): schedule identity registration and brand create via outbox
- d206a7c: refactor: rename @pine/http-core to @pine/http
- 689a980: refactor: rename @pine/http to @pine/server and merge graphql-core
- Updated dependencies [5b5506b]
- Updated dependencies [4b72801]
- Updated dependencies [d175229]
- Updated dependencies [d206a7c]
- Updated dependencies [689a980]
  - @pine/common@0.0.2
  - @pine/server@1.0.0

## 0.1.0

### Minor Changes

- d05915a: refactor: rename packages to events/http, add CloudEvents and Hydra OAuth

### Patch Changes

- Updated dependencies [d05915a]
  - @pine/server@0.2.0

## 0.0.1

### Patch Changes

- 68dd71c: feat: rebuild identity on Kratos and replace gateway with api-gateway
- Updated dependencies [68dd71c]
  - @pine/common@0.0.1
  - @pine/server-core@0.1.0
