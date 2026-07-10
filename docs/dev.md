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

Align root `.env` with `docker-compose.yaml` (see `.env.example`).

## Recommended: VS Code / Cursor

### Run the full stack (debug)

1. Open the Run and Debug view.
2. Choose compound **`dev`** and start it (F5).

That compound:

1. Runs pre-launch task **`dev:prepare`**
   - `pnpm dev:infra` → Docker Compose up
   - `pnpm gql:compose` → writes `services/gateway/supergraph.graphql`
2. Launches (each in its own debug terminal):
   - `auth`, `issue-tracker`, `attachment`, `mail`, `gateway`
   - `issue-tracker (client)` (Vite)
   - `codegen: supergraph` (`pnpm gen` for client GraphQL types)

Other compounds:

| Compound | Behavior |
|----------|----------|
| **dev** | Infra + compose + all services/client (default) |
| **dev (apps only)** | Same processes, no Docker / gql pre-task |
| **dev (linux + browser)** | Same as **dev**, plus Brave debugger |

Individual configurations (auth, gateway, client, …) can be started one at a time.

### Tasks (Terminal → Run Task…)

| Task | What it does |
|------|----------------|
| `dev:infra` | `docker compose up -d` |
| `dev:infra:down` | `docker compose down` |
| `gql:compose` | Rover supergraph compose |
| `dev:prepare` | Infra then gql compose (also preLaunch for **dev**) |
| `dev:apps` | Nx `run-many -t dev` for all apps (no debugger) |
| `supergraph` | Long-running `rover dev` (optional alternate) |

### Stopping

- Stop the debug session to kill app processes (`stopAll` on compounds).
- Containers keep running until you run task **`dev:infra:down`** or `pnpm dev:infra:down`.

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
