# Local full-stack development

## One command

```bash
pnpm install
# first time: copy env (or let pnpm dev create it from .env.example)
pnpm dev
```

That single script:

1. Ensures a root `.env` exists (from `.env.example` if needed)
2. Starts Docker Compose infra (Postgres, NATS, Redis, …)
3. Waits for NATS and Postgres ports
4. Composes the GraphQL supergraph for the gateway
5. Runs **client + all services** with Nx continuous `dev` targets

| Process | Default |
|---------|---------|
| Client (Vite) | http://localhost:3000 |
| Gateway | http://localhost:4000 |
| Auth | port 4001 |
| Issue tracker | port 4002 |
| Attachment | port 4003 |
| Mail | worker (NATS) |

## Flags

Pass flags after `--`:

```bash
pnpm dev -- --help
pnpm dev -- --no-infra              # apps only (compose already up)
pnpm dev -- --infra-only            # only docker compose up -d
pnpm dev -- --infra-only --down     # docker compose down
pnpm dev -- --apps=client,auth,gateway
pnpm dev -- --skip-gql
```

Shortcuts:

```bash
pnpm dev:infra        # docker compose up -d
pnpm dev:infra:down   # docker compose down
pnpm dev:apps         # Nx apps only (no compose)
```

## Prerequisites

- Node ≥ 20, pnpm ≥ 9
- Docker Desktop (for infra)
- Root `.env` aligned with `docker-compose.yaml` (see `.env.example`)

## Stopping

- **Ctrl+C** stops Node/Nx app processes; containers keep running.
- Tear down infra with `pnpm dev:infra:down` or `pnpm dev -- --infra-only --down`.

## K8s path (optional)

```bash
pnpm server   # skaffold dev — requires a cluster; not used by pnpm dev
```

## Related

- [Nx pipeline](./nx.md)
