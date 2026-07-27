# Turborepo monorepo pipeline

This workspace uses **Turborepo** on top of **pnpm workspaces**.

## Projects

| Name                                                                                                                    | Path         |
| ----------------------------------------------------------------------------------------------------------------------- | ------------ |
| `@pine/*`                                                                                                               | `packages/*` |
| `@pine/identity-service`, `@pine/attachment-service`, `@pine/mail-service`, `@pine/issues-service`, `@pine/api-gateway` | `services/*` |
| `@pine/issues-web`, `@pine/identity-web`, `@pine/inventory-web`                                                         | `apps/*`     |

```bash
pnpm exec turbo run build --dry-run
pnpm graph
```

## Common commands

```bash
# Local stack: VS Code compound "dev" (or pnpm dev:infra + dev:apps)
# The "dev" launch config also starts schemas:watch (supergraph + OpenAPI).
pnpm dev:infra
pnpm schemas:compose   # or: pnpm schemas:watch
pnpm dev:apps


# Full graph-aware build (uses local cache)
pnpm build

# Server packages + services only (skips client UI apps)
pnpm build:server

# Only packages affected vs the default base branch
pnpm build:affected
pnpm test:affected

# Single project
pnpm exec turbo run build --filter=@pine/identity-service
pnpm exec turbo run dev --filter=@pine/identity-service   # persistent; builds deps first (^build)
pnpm exec turbo run dev --filter=@pine/issues-web

# Cache
pnpm turbo:clean
```

## How caching works

Configured in root `turbo.json`:

- **`build`**: `dependsOn: ["^build"]`, cacheable, outputs `dist/**`
- **`test`**: depends on `^build`, cacheable, non-watch Vitest
- **`dev`**: `dependsOn: ["^build"]`, not cached, `persistent: true`
- **`gen`**: not cached, persistent (GraphQL codegen watch)

Second identical `turbo run build` should report a cache hit.

## CI

`.github/workflows/ci.yml` runs on **pull requests and pushes to `development`/`main`** (plus manual `workflow_dispatch`). It executes:

```bash
pnpm exec turbo run build test --filter=...[<base>] --filter=!@pine/issues-web
```

where `<base>` is the PR base branch, or `origin/development` on push.

Requirements:

- full git history for affected detection (`fetch-depth: 0`)
- pnpm (from `packageManager` in root `package.json`) + Node 22
- `.turbo` restored between runs
- `@pine/issues-web` excluded until its typecheck is green

**Repo setting:** Actions must be enabled under **Settings → Actions → General** (`Allow all actions and reusable workflows`). If Actions is disabled, workflows stay “active” in the API but never create runs (PR checks will only show third-party apps like GitGuardian).

Related: `.github/workflows/changeset-required.yml` enforces one Changeset on non-draft PRs into `development` (skip with label `skip-changeset`).

## Docker

Root `Dockerfile` installs with pnpm, then runs `turbo run build` for server packages and services (not the Vite clients). Skaffold targets (`attachment`, `email`, `auth`, `issue-tracker`) still map to multi-stage images.
