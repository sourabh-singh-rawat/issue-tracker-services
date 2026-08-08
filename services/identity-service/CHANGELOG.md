# @pine/identity-service

## 0.3.0

### Minor Changes

- dfa43fd: feat(inventory): add inventory-service with gateway proxy, bootstrap env modules, and OAuth token cookies
- 1ab5ff4: refactor(env): unify root .env and URL-based service bootstrap

### Patch Changes

- Updated dependencies [dfa43fd]
  - @pine/http@0.2.1

## 0.2.0

### Minor Changes

- 2f7e145: feat(identity): add OAuth consent, token exchange, and client auth flows
- d05915a: refactor: rename packages to events/http, add CloudEvents and Hydra OAuth
- 656d23b: feat(identity): add session cookies with me and logout
- c73b916: feat(identity): move registration to REST and implement Kratos login

### Patch Changes

- Updated dependencies [d05915a]
  - @pine/events@0.1.0
  - @pine/http@0.2.0
  - @pine/security@0.0.2

## 0.1.0

### Minor Changes

- 68dd71c: feat: rebuild identity on Kratos and replace gateway with api-gateway

### Patch Changes

- Updated dependencies [68dd71c]
  - @pine/common@0.0.1
  - @pine/errors@0.1.0
  - @pine/events@0.0.1
  - @pine/graphql-core@0.0.1
  - @pine/observability@0.1.0
  - @pine/orm@0.0.1
  - @pine/security@0.0.1
  - @pine/server-core@0.1.0
