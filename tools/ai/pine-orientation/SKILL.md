---
name: pine-orientation
description: >
  Map the Pine monorepo: which app/service/package owns a domain, package renames,
  where to edit. Triggers: where does X live, monorepo map, which service, package layout.
---

# Pine orientation

pnpm + Turborepo monorepo. Workspace: `apps/**`, `packages/**`, `services/**`.

## Where to edit

| Change                               | Location                                            |
| ------------------------------------ | --------------------------------------------------- |
| UI                                   | `apps/<web>`                                        |
| Business rules / API                 | owning `services/<service>/src/features/`           |
| Shared enum/DTO/error (2+ consumers) | `packages/common` (or other `@pine/*`)              |
| Cross-service async                  | `@pine/events` → `pine-events`                      |
| HTTP server / logger                 | `@pine/http`                                   |
| Local stack                          | `infra/docker` + root `pnpm dev:infra*`             |
| Repo tooling scripts                 | `tools/scripts/` (release, schemas compose, concat) |
| Agent skills                         | `tools/ai/*/SKILL.md`                               |

Extract to `packages/*` only when **two** services need the same logic.

## Ownership

| Domain                                    | Owner                                                               |
| ----------------------------------------- | ------------------------------------------------------------------- |
| Auth / IdP / OAuth                        | `identity-service` + Ory (Kratos/Hydra)                             |
| Workspaces / projects / issues / statuses | `issues-service` + `erp-web`                                        |
| Inventory UI                              | `inventory-service` + `erp-web`                                     |
| Product catalog                           | `product-service` + `erp-web`                                       |
| Attachments                               | `attachment-service`                                                |
| Transactional email / notifications       | `notification-service` (`integrations/email`, not a shared package) |
| Federated GraphQL supergraph              | `api-gateway` (`dist/supergraph.graphql`)                           |
| Client GraphQL ops                        | `apps/*/src/graphql/**/*.gql`                                       |

## Apps / services / packages

**Apps:** `erp-web` (primary product UI — issues + inventory), `identity-web` (sign-in/registration/consent)

**Services:** `identity-service`, `issues-service`, `inventory-service`, `product-service`, `attachment-service`, `notification-service`, `api-gateway`

| Package               | Import for                                                       |
| --------------------- | ---------------------------------------------------------------- |
| `@pine/common`        | enums, DTOs, errors, `uuidv7`                                    |
| `@pine/errors`        | `ApplicationError`                                               |
| `@pine/events`        | NATS, CloudEvents, `publisher.send(event)`, consumers            |
| `@pine/http`     | `FastifyHttpServer`, `PinoLogger`, `ILogger`, `HttpRouteOptions` |
| `@pine/graphql-core`  | Pothos `builder`, scalars                                        |
| `@pine/security`      | JWT, hashing, auth helpers                                       |
| `@pine/observability` | OTEL bootstrap                                                   |

## Dead packages (never import)

| Dead                | Use                                           |
| ------------------- | --------------------------------------------- |
| `@pine/server-core` | `@pine/http`                             |
| `@pine/event-bus`   | `@pine/events`                                |
| `@pine/orm`         | Drizzle (`src/db/`, service repositories)     |
| `@pine/comm`        | `notification-service/src/integrations/email` |
| `@pine/forms`       | app `shared/ui` / feature components          |

Dockerfile turbo `--filter`s must use **current** names only.

## Traps

- Root `README` install steps are legacy; monorepo + `package.json` scripts are source of truth
- Do not hand-edit `**/__generated__/**` or `api-gateway/dist/*`
- Do not search `infra/data/` or `node_modules/` for product code
