---
name: pine-dev-loop
description: >
  Run Pine locally: infra, apps, turbo filters, build/test/lint, schema compose.
  Triggers: pnpm dev, build, test, schemas:compose, how do I run X.
---

# Dev loop

Root cwd. Node ≥20.13.1; pnpm from root `packageManager`.

## Full stack

```bash
pnpm dev:infra          # down: dev:infra:down
pnpm setup              # migrate → authz seed → bootstrap admin → grant platform admin
pnpm schemas:compose    # or schemas:watch
pnpm dev:apps
```

`pnpm setup` runs `tools/scripts/setup.ts`. Needs infra up and `BOOTSTRAP_ADMIN_*` in root `.env`.

| Infra variant           | Script                                 |
| ----------------------- | -------------------------------------- |
| Default single-db + Ory | `dev:infra`                            |
| Multi-db                | `dev:infra:multi-db`                   |
| + OTEL stack            | `dev:infra:observability`              |
| Kratos / Hydra only     | `dev:infra:kratos` / `dev:infra:hydra` |

Compose: `infra/docker/*`. All secrets and app/Vite env: single root `.env` (from `.env.example`).

## One package

```bash
pnpm exec turbo run dev --filter=@pine/issues-service
pnpm exec turbo run build test --filter=@pine/<name>...   # ... = dependents
```

Shortcuts: `pnpm erp-web`, `identity-service`, `issues-service`, `api-gateway`, …

## Verify

| Touched         | Command                                                              |
| --------------- | -------------------------------------------------------------------- |
| Package/service | `turbo run build test --filter=@pine/<name>...`                      |
| GraphQL schema  | service writes `dist/schema.graphql` → `schemas:compose` → web `gen` |
| Shared lib      | `build:server` or affected filters                                   |
| Style           | `pnpm lint` / `fmt:check`                                            |

Also: `pnpm build`, `build:server`, `build:affected`, `test`, `test:affected`, `check:knip`.

Schema: `pnpm schemas:compose` · Client: `pnpm gen` (erp-web). Supergraph path: `services/api-gateway/dist/supergraph.graphql`.

## Guardrails

- Prefer filtered turbo; full monorepo only when needed
- Pre-commit runs **`pnpm build`** — commits need green build
- Never hand-edit `__generated__/`
- Skip `infra/data/`, `node_modules/`
- Current packages: `@pine/server`, `@pine/events` — **not** `server-core` / `event-bus`
- After renames: fix root `Dockerfile` turbo filters
- **Never generate or apply DB migrations on your own** (`db:generate`, `drizzle-kit generate`, hand-edit `drizzle/`, `db:migrate` / `db:push`). Change table TS only, then tell the user the exact generate command and wait unless they explicitly ask you to run it. See root `AGENTS.md`.
