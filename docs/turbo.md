# Turborepo monorepo pipeline

This workspace uses **Turborepo** on top of **pnpm workspaces**.

## Projects

| Name | Path |
|------|------|
| `@pine/*` | `packages/*` |
| `@pine/auth`, `@pine/attachment`, `@pine/mail`, `@pine/issues`, `@pine/gateway` | `services/*` |
| `@pine/issue-web`, `@pine/identity`, `@pine/inventory` | `apps/*` |

```bash
pnpm exec turbo run build --dry-run
pnpm graph
```

## Common commands

```bash
# Local stack: VS Code compound "dev" (or pnpm dev:infra + dev:apps)
pnpm dev:infra
pnpm gql:compose
pnpm dev:apps

# Full graph-aware build (uses local cache)
pnpm build

# Server packages + services only (skips client UI and forms)
pnpm build:server

# Only packages affected vs the default base branch
pnpm build:affected
pnpm test:affected

# Single project
pnpm exec turbo run build --filter=@pine/auth
pnpm exec turbo run dev --filter=@pine/auth   # persistent; builds deps first (^build)
pnpm exec turbo run dev --filter=@pine/issue-web

# Cache
pnpm turbo:clean
```

## How caching works

Configured in root `turbo.json`:

- **`build`**: `dependsOn: ["^build"]`, cacheable, outputs `dist/**`
- **`test`**: depends on `^build`, cacheable, non-watch Jest
- **`dev`**: `dependsOn: ["^build"]`, not cached, `persistent: true`
- **`gen`**: not cached, persistent (GraphQL codegen watch)

Second identical `turbo run build` should report a cache hit.

## CI

`.github/workflows/ci.yml` runs `turbo run build test --filter=...[origin/main]` with:

- full git history for affected detection
- pnpm + Node 20
- `.turbo` restored between runs
- `@pine/issue-web` excluded until its typecheck is green

## Docker

Root `Dockerfile` installs with pnpm, then runs `turbo run build` for server packages and services (not the Vite clients). Skaffold targets (`attachment`, `email`, `auth`, `issue-tracker`) still map to multi-stage images.
