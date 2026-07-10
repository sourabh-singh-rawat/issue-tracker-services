# Nx monorepo pipeline

This workspace uses **Nx** (package-based) on top of **pnpm workspaces**.

## Projects

| Name | Path |
|------|------|
| `@issue-tracker/*` | `packages/*` |
| `auth`, `attachment`, `mail`, `issue-tracker`, `gateway` | `services/*` |
| `client` | `clients/issue-tracker` |

```bash
pnpm exec nx show projects
pnpm exec nx graph
```

## Common commands

```bash
# Full local stack (infra + client + services) — see docs/dev.md
pnpm dev

# Full graph-aware build (uses local cache)
pnpm build

# Server packages + services only (skips client UI and forms)
pnpm build:server

# Only projects affected vs main
pnpm build:affected
pnpm test:affected

# Single project
pnpm exec nx run auth:build
pnpm exec nx run auth:dev          # continuous; builds deps first (^build)
pnpm exec nx run client:dev

# Cache
pnpm nx:reset
```

## How caching works

Configured in root `nx.json`:

- **`build`**: `dependsOn: ["^build"]`, `cache: true`, outputs `{projectRoot}/dist`
- **`test`**: depends on `^build`, cacheable, non-watch Jest
- **`dev`**: `dependsOn: ["^build"]`, not cached, continuous

Second identical `nx run <project>:build` should report a cache hit.

## CI

`.github/workflows/ci.yml` runs `nx affected -t build,test` with:

- full git history for affected detection
- pnpm + Node 20
- `.nx/cache` restored between runs
- `client` excluded until its typecheck is green

## Docker

Root `Dockerfile` installs with pnpm, then runs `nx run-many -t build` for server projects (not the Vite client). Skaffold targets (`attachment`, `email`, `auth`, `issue-tracker`) still map to multi-stage images.
