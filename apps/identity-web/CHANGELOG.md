# @pine/identity-web

## 0.4.0

### Minor Changes

- 14a1fb5: Identity email verification and session APIs; migrate services to Drizzle with local identities tables; remove workspace multi-tenancy from issues and ERP web
- 4b72801: refactor(identity): drop local email, add profile names, register with username

### Patch Changes

- de6a3b1: feat(authz): organizations, authorization, roles, keto, and admin-web
- 0acc6d3: fix(identity): login returns 204/302 and OAuth redirect via response

## 0.3.0

### Minor Changes

- 1ab5ff4: refactor(env): unify root .env and URL-based service bootstrap

## 0.2.0

### Minor Changes

- 2f7e145: feat(identity): add OAuth consent, token exchange, and client auth flows
- 656d23b: feat(identity): add session cookies with me and logout
- c73b916: feat(identity): move registration to REST and implement Kratos login

## 0.1.0

### Minor Changes

- 68dd71c: feat: rebuild identity on Kratos and replace gateway with api-gateway
