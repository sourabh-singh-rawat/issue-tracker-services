---
name: pine-docker-infra
description: >
  Local Docker Compose: Postgres, Ory, NATS, ports, env split. Triggers: dev:infra,
  Kratos, Hydra, compose, single-db, multi-db.
---

# Docker infra

## Env split

| File | Holds |
|------|--------|
| `infra/docker/.env` | Compose secrets (Postgres roles, Kratos/Hydra, Grafana, pgAdmin) |
| Root `.env` | App runtime (DB URLs, JWT, OTEL, Kratos/Hydra URLs) |

Password segments in root DB URLs must **match** compose `POSTGRES_*` (dotenv does not expand compose vars into root `.env`).

```bash
cp infra/docker/.env.example infra/docker/.env
cp .env.example .env
```

## Commands (prefer these)

| Script | Stack |
|--------|--------|
| `pnpm dev:infra` / `:down` | compose + single-db + ory-db + kratos + hydra |
| `dev:infra:multi-db` | multi-db overlay |
| `dev:infra:observability` | + Alloy/Tempo/Loki/Grafana profile |
| `dev:infra:kratos` / `hydra` | Ory only |

Files under `infra/docker/`: `compose.yaml`, `compose.single-db.yaml` (default), `compose.multi-db.yaml`, `compose.ory-db.yaml`, `compose.kratos.yaml`, `compose.hydra.yaml`.

## Ports (typical)

| Host | Service |
|------|---------|
| 5432 | Postgres |
| 4222 / 8222 | NATS client / monitor |
| 6380 | attachment redis |
| 4433 / 4434 | Kratos public / admin |
| 4444 / 4445 | Hydra public / admin |
| 4436 / 4437 | mailslurper |
| 5555 | pgAdmin |
| 4317 | Alloy OTLP (obs profile only) |

Confirm in active compose + root `.env.example`.

## Ory

- Config: `infra/docker/identity/kratos/`, `identity/hydra/`
- `KRATOS_SECRETS_CIPHER` must be **32 chars**
- App URLs: `KRATOS_*_URL`, `HYDRA_*_URL` in root `.env`

## Rules

1. Root `pnpm` scripts > ad-hoc compose flags
2. Extend existing overlays; don’t invent new compose basenames
3. Data under `infra/data/docker/*` — not source; don’t recurse for code
4. DB reset = down + delete volume dir (confirm with user first)
5. Port/password changes → update both `.env.example` files
