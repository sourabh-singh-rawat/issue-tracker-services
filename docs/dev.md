# Local full-stack development

Local development is driven by **VS Code** (or Cursor) **launch / tasks**, plus thin `pnpm` helpers for infra and Nx. There is no Node orchestrator script (`scripts/dev.mjs`).

## First-time setup

```bash
pnpm install
# root env (services load ../../.env via dotenv)
cp .env.example .env
# client Vite env (Apollo / supergraph URL)
cp clients/issue-tracker/.env.example clients/issue-tracker/.env
```

Align root `.env` with Docker Compose (see `.env.example`). Compose reads secrets from the root `.env` via `--env-file`:

| Variable | Purpose | Example default (local only) |
|----------|---------|------------------------------|
| `POSTGRES_PASSWORD` | All Compose Postgres services | `it-dev-pg-n7k4m2xq` |
| `PGADMIN_DEFAULT_EMAIL` | pgAdmin login email | `pgadmin@issue-tracker.local` |
| `PGADMIN_DEFAULT_PASSWORD` | pgAdmin login password | `it-dev-pgadmin-r9w3c8hp` |

Keep the password segment of each `*_POSTGRES_CLUSTER_URL` identical to `POSTGRES_PASSWORD` (dotenv does not expand nested vars). These defaults are repo-specific and for local dev only — change them for any shared or non-dev environment.

**Volume note:** Postgres applies `POSTGRES_PASSWORD` only on first data-dir init. After changing the password, either update the role inside Postgres or remove the Compose data volumes under `infra/data/` and bring infra up again.

## Recommended: VS Code / Cursor

Infra (Docker) and app debug are **separate** on purpose: containers stay up across debug restarts.

### 1. Start infra (once per machine session)

**Terminal → Run Task…** (or Command Palette → “Tasks: Run Task”):

| Task | What it does |
|------|----------------|
| **`infra: up`** | `docker compose up -d` (Postgres, Redis, NATS, pgAdmin) |
| **`infra: down`** | `docker compose down` |
| **`infra: status`** | `docker compose ps` |
| **`infra: logs`** | Follow compose logs |

Or from a shell: `pnpm dev:infra` / `pnpm dev:infra:down`.

### 2. Run apps in debug (F5)

1. Open the Run and Debug view.
2. Choose compound **`dev`** and start it (F5).

That compound only launches app processes (no Docker pre-task):

- `auth`, `issue-tracker`, `attachment`, `mail`, `gateway`
- `issue-tracker (client)` (Vite)
- `codegen: supergraph` (`pnpm gen` for client GraphQL types)

Other compounds:

| Compound | Behavior |
|----------|----------|
| **dev** | All services + client (debug only; infra must already be up) |
| **dev + browser** | Same as **dev**, plus Chrome client debugger |
| **dev (linux + browser)** | Same as **dev**, plus Brave debugger (Linux path) |

If the gateway supergraph SDL is missing or stale, run task **`gql:compose`** once (`pnpm gql:compose`).

### Client-side (browser) debugging

The Vite process alone (`issue-tracker (client)`) does not bind breakpoints in React/TSX. Use one of these **shared** configs (no machine-specific browser paths):

| Configuration | Behavior |
|---------------|----------|
| **client (browser)** | Launch Chrome against `http://localhost:3000` (Vite must already be running) |
| **client (browser - edge)** | Same with Microsoft Edge |
| **issue-tracker (client + browser)** | Start Vite, then auto-attach Chrome when the dev server is ready |

Optional machine-specific configs (`brave (debug)`, `brave (debug - scoop)`) remain for Brave installs.

Set breakpoints in `clients/issue-tracker/src/**/*.{ts,tsx}`, start **dev + browser** (or client + browser), and the debugger will stop on client code.

Individual configurations (auth, gateway, client, …) can be started one at a time.

### Other tasks (Terminal → Run Task…)

| Task | What it does |
|------|----------------|
| `gql:compose` | Rover supergraph compose (gateway SDL) |
| `dev:apps` | Nx `run-many -t dev` for all apps (no debugger, no Docker) |
| `supergraph` | Long-running `rover dev` (optional alternate) |

### Stopping

- Stop the debug session to kill **app** processes only (`stopAll` on compounds).
- Containers keep running until you run task **`infra: down`** or `pnpm dev:infra:down`.

## CLI helpers (no orchestrator)

Use these from a terminal when you are not using the debugger:

```bash
pnpm dev:infra        # docker compose up -d
pnpm dev:infra:down   # docker compose down
pnpm gql:compose      # rover supergraph compose
pnpm dev:apps         # Nx: client + all services (parallel)

# single project
pnpm client
pnpm auth
pnpm gateway
# …
```

| Process | Default |
|---------|---------|
| Client (Vite) | http://localhost:3000 |
| Gateway | http://localhost:4000 |
| Auth | port 4001 |
| Issue tracker | port 4002 |
| Attachment | port 4003 |
| Mail | worker (NATS) |

## Prerequisites

- Node ≥ 20, pnpm ≥ 9
- Docker Desktop (for infra)
- Root `.env` and client `.env` as above
- VS Code / Cursor with the workspace `.vscode/launch.json` and `tasks.json`

## K8s path (optional)

```bash
pnpm server   # skaffold dev — requires a cluster; separate from local compose + launch
```

## Related

- [Nx pipeline](./nx.md)
