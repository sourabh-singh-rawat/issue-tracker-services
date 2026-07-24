---
name: pine-web-feature
description: >
  React features in issues-web / identity-web: TanStack routes, .gql ops, codegen,
  Zustand. Triggers: add page, route, CreateIssue.gql, gen:gql, gen:api.
---

# Web feature

Primary reference: `apps/issues-web`. Stack: React 19, Vite, MUI, TanStack Router/Query, Zustand, GraphQL codegen, Hey API.

No `@pine/forms` — use app `shared/` / feature components.

## Layout

```text
src/
  features/<domain>/{components,pages,store}/
  routes/(no-auth)|_authenticated/   # file routes; thin (page import only)
  graphql/<domain>/*.gql             # ops only
  __generated__/{gql,api,routeTree.gen.ts}  # never hand-edit
  shared/  bootstrap/
```

## Slice

1. **UI** under `features/<domain>/`; export from feature `index.ts`.
2. **Route** under correct auth group; match existing URL patterns (`i.$issueId`, `$workspaceId`, …).

```ts
export const Route = createFileRoute("/_authenticated/i/$issueId")({
  component: IssuePage,
});
```

3. **GQL** in `src/graphql/<domain>/X.gql` → import hooks from `__generated__/gql/*`.

```bash
# after server schema + compose
pnpm schemas:compose
pnpm --filter @pine/issues-web gen        # gql + api
# or: gen:gql / gen:api
```

Schema for codegen: `services/api-gateway/dist/supergraph.graphql` (must exist).

4. **State:** server → generated React Query hooks; UI → existing Zustand under feature `store/`.

## Hard rules

- Regenerated clients only — no hand-copied server types
- Routes stay thin; UI lives in features
- Prefer existing MUI + `shared` primitives over new kits
- Build check: `pnpm exec turbo run build --filter=@pine/issues-web`
