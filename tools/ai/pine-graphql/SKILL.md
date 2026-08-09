---
name: pine-graphql
description: >
  Pothos GraphQL via @pine/server: inputs/objects/resolvers, schema compose,
  supergraph. Triggers: CreateIssueInput, mutation, query, schemas:compose, supergraph.
---

# GraphQL (Pothos)

- Builder: `builder` from `@pine/server` (scalars: `DateTimeISO`, `UUID`, `EmailAddress`)
- Service emits `dist/schema.graphql` on start/build
- Compose: `pnpm schemas:compose` → `services/api-gateway/dist/supergraph.graphql`
- Clients: `apps/*/src/graphql/**/*.gql` + app `gen:gql` (`pine-web-feature`)

## issues-service layout

```text
features/<domain>/graphql/
  index.ts              # side-effect imports ONLY (registration)
  inputs/CreateXInput.ts
  objects/XObject.ts
  queries/findX.ts      # one file per field, camelCase
  mutations/createX.ts
```

`graphql/schema.ts` imports each domain’s `graphql` barrel. **Missing import ⇒ field absent from schema.**

## Recipe (mutation)

```ts
// inputs/CreateXInput.ts
export const CreateXInput = builder.inputType("CreateXInput", {
  fields: (t) => ({ name: t.string({ required: true }) }),
});

// mutations/createX.ts
builder.mutationFields((t) => ({
  createX: t.string({
    args: { input: t.arg({ type: CreateXInput, required: true }) },
    resolve: async (_r, { input }, ctx) => {
      const svc = container.get<IXService>(TYPES.XService);
      return dataSource.transaction((manager) =>
        svc.createX({ manager, userId: ctx.user!.id, ...input }),
      );
    },
  }),
}));
```

Queries: `builder.queryFields`. Filters: `Find*Input` / `Find*Options`. Auth user: `ctx.user` from `src/graphql/context.ts` — don’t invent parallel auth.

## Naming

| Thing              | Style                                           |
| ------------------ | ----------------------------------------------- |
| Field              | camelCase `createIssue` / `findProjects`        |
| GraphQL type       | PascalCase `CreateIssueInput`                   |
| Input/object files | PascalCase                                      |
| Query modules      | camelCase, one field per file `findProjects.ts` |
| Mutation modules   | camelCase, one field per file `createIssue.ts`  |

Match the feature you’re editing.

## After change

```bash
# service must write dist/schema.graphql first
pnpm schemas:compose
pnpm --filter @pine/erp-web gen:gql   # if UI consumes it
```

Never hand-edit `api-gateway/dist` or app `__generated__`.
