# @pine/api-gateway

## 0.3.2

### Patch Changes

- 07bb3bc: feat(authz): keto subject-set grants, role capability checks, and local session identity ids

## 0.3.1

### Patch Changes

- 11abe4b: feat(product): add product-service with dedicated database, gateway proxy and bootstrap; add brand operations
- de6a3b1: feat(authz): organizations, authorization, roles, keto, and admin-web
- 9c0d187: feat(web): merge issues-web and inventory-web into a single erp-web app

  Product UI lives in `@pine/erp-web` (port 3001) with OIDC PKCE auth and an inventory route shell. Backend CORS and invite URLs use `ERP_WEB_URL` instead of separate issues/inventory web origins.

- d206a7c: refactor: rename @pine/http-core to @pine/http
- 689a980: refactor: rename @pine/http to @pine/server and merge graphql-core
- Updated dependencies [4b72801]
- Updated dependencies [d206a7c]
- Updated dependencies [689a980]
  - @pine/server@1.0.0

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
- bbf22bc: feat(api-gateway): add schemas:watch compose and supergraph hot-reload
- c73b916: feat(identity): move registration to REST and implement Kratos login

### Patch Changes

- Updated dependencies [d05915a]
  - @pine/server@0.2.0

## 0.1.0

### Minor Changes

- 68dd71c: feat: rebuild identity on Kratos and replace gateway with api-gateway

### Patch Changes

- Updated dependencies [68dd71c]
  - @pine/observability@0.1.0
  - @pine/server-core@0.1.0
