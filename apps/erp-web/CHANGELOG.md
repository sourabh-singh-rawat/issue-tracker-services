# @pine/erp-web

## 0.4.0

### Minor Changes

- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- 9c0d187: feat(web): merge issues-web and inventory-web into a single erp-web app

  Product UI lives in `@pine/erp-web` (port 3001) with OIDC PKCE auth and an inventory route shell. Backend CORS and invite URLs use `ERP_WEB_URL` instead of separate issues/inventory web origins.

### Patch Changes

- de6a3b1: feat(authz): organizations, authorization, roles, keto, and admin-web
- Updated dependencies [de6a3b1]
- Updated dependencies [5b5506b]
- Updated dependencies [d175229]
- Updated dependencies [d206a7c]
  - @pine/ui@0.1.0
  - @pine/common@0.0.2

## 0.3.0

### Minor Changes

- Merge issues-web and inventory-web into a single ERP web app.
