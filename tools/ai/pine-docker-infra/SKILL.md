---
name: pine-docker-infra
description: >
  Local Docker Compose: Postgres, Ory, NATS, ports, single root env. Triggers: dev:infra,
  Kratos, Hydra, Keto, compose, single-db, multi-db.
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

| Script                                | Stack                                                |
| ------------------------------------- | ---------------------------------------------------- |
| `pnpm dev:infra` / `:down`            | compose + single-db + ory-db + kratos + hydra + keto |
| `dev:infra:multi-db`                  | multi-db overlay                                     |
| `dev:infra:observability`             | + Alloy/Tempo/Loki/Grafana profile                   |
| `dev:infra:kratos` / `hydra` / `keto` | Ory identity + OAuth + graph auth                    |

Files under `infra/docker/`: `compose.yaml`, `compose.single-db.yaml` (default), `compose.multi-db.yaml`, `compose.ory-db.yaml`, `compose.kratos.yaml`, `compose.hydra.yaml`, `compose.keto.yaml`.

## Ports (typical)

| Host        | Service                       |
| ----------- | ----------------------------- |
| 5432        | Postgres                      |
| 4222 / 8222 | NATS client / monitor         |
| 6380        | Redis (`REDIS_URL`)           |
| 4433 / 4434 | Kratos public / admin         |
| 4444 / 4445 | Hydra public / admin          |
| 4466 / 4467 | Keto read / write             |
| 5555        | pgAdmin                       |
| 4317        | Alloy OTLP (obs profile only) |

Confirm in active compose + root `.env.example`.

## Ory (Kratos, Hydra, Keto)

- Config: `infra/docker/identity/kratos/`, `identity/hydra/`, `authorization/keto/`
- `KRATOS_SECRETS_CIPHER` must be **32 chars**
- App URLs: `KRATOS_*_URL`, `HYDRA_*_URL`, `KETO_READ_URL` / `KETO_WRITE_URL` in root `.env`
- Keto datastore: role/DB `keto` on **ory-postgres** (`POSTGRES_KETO_PASSWORD`)
- Keto namespaces: OPL in `services/authorization-service/src/integrations/authorization/ory-keto/opl/namespaces.ts` (file-bind `keto.yaml` + mount OPL at `/etc/config/keto/opl`; do not nest that mount under a read-only directory bind of `authorization/keto`). `namespaces.location` in `keto.yaml` must point at that single `.ts` file. Class names are namespace strings (`identity`, `platform`, `tenant`, …). Do not add a parallel `id`/`name` list.
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
6. Init scripts only apply on **fresh** volumes; after openfga→keto cutover, recreate ory-postgres volume (or create `keto` role/DB manually) if migrate fails
7. Switching Keto from a static namespace `id`/`name` list to OPL (`namespaces.location`) changes namespace IDs — recreate the `keto` database (or ory-postgres volume) before relying on existing tuples
