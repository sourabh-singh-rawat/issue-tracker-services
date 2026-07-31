---
name: pine-docker-infra
description: >
  Local Docker Compose: Postgres, Ory, NATS, ports, single root env. Triggers: dev:infra,
  Kratos, Hydra, compose, single-db, multi-db.
---

# Docker infra

## Env (single file at monorepo root)

| File                         | Holds                                                   |
| ---------------------------- | ------------------------------------------------------- |
| Root `.env` / `.env.example` | Everything: compose secrets, app runtime, Vite `VITE_*` |

Set each `POSTGRES_*_PASSWORD` for compose init. Apps require full
`<DOMAIN>_DATABASE_URL` (e.g. `postgres://{role}:{password}@localhost:5432/{db}`).

```bash
cp .env.example .env
```

Compose is always started with `--env-file .env` (see root `pnpm dev:infra*`).

## Commands (prefer these)

| Script                       | Stack                                         |
| ---------------------------- | --------------------------------------------- |
| `pnpm dev:infra` / `:down`   | compose + single-db + ory-db + kratos + hydra |
| `dev:infra:multi-db`         | multi-db overlay                              |
| `dev:infra:observability`    | + Alloy/Tempo/Loki/Grafana profile            |
| `dev:infra:kratos` / `hydra` | Ory only                                      |

Files under `infra/docker/`: `compose.yaml`, `compose.single-db.yaml` (default), `compose.multi-db.yaml`, `compose.ory-db.yaml`, `compose.kratos.yaml`, `compose.hydra.yaml`.

## Ports (typical)

| Host        | Service                       |
| ----------- | ----------------------------- |
| 5432        | Postgres                      |
| 4222 / 8222 | NATS client / monitor         |
| 6380        | Redis (`REDIS_URL`)           |
| 4433 / 4434 | Kratos public / admin         |
| 4444 / 4445 | Hydra public / admin          |
| 5555        | pgAdmin                       |
| 4317        | Alloy OTLP (obs profile only) |

Confirm in active compose + root `.env.example`.

## Ory

- Config: `infra/docker/identity/kratos/`, `identity/hydra/`
- `KRATOS_SECRETS_CIPHER` must be **32 chars**
- App URLs: `KRATOS_*_URL`, `HYDRA_*_URL` in root `.env`
- Kratos mail (verification/recovery): root `.env` only — never secrets in `kratos.yaml`
  - `BREVO_EMAIL` → `COURIER_SMTP_FROM_ADDRESS` (Brevo-verified sender)
  - `COURIER_SMTP_CONNECTION_URI` → Brevo SMTP relay URI
  - `COURIER_SMTP_FROM_NAME` (optional, default `Pine`)
  - Verification email links: custom templates under `identity/kratos/courier-templates/` rewrite
    Kratos’ `VerificationURL` (`:4433/self-service/verification?...`) to
    `http://localhost:3000/verification?code=…&flow=…` (identity-web)

## Rules

1. Root `pnpm` scripts > ad-hoc compose flags
2. Extend existing overlays; don’t invent new compose basenames
3. Data under `infra/data/docker/*` — not source; don’t recurse for code
4. DB reset = down + delete volume dir (confirm with user first)
5. Port/password changes → update root `.env.example` (and local `.env`) only — no per-package env files
