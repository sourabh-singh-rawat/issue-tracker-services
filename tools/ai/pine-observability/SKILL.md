---
name: pine-observability
description: >
  @pine/observability OTEL + local Alloy/Tempo/Loki/Grafana. Triggers: OTEL,
  tracing, Alloy, OTEL_EXPORTER_OTLP_ENDPOINT, observability profile.
---

# Observability

| Layer | Where |
|-------|--------|
| SDK | `@pine/observability` → OTLP gRPC |
| Local stack | `pnpm dev:infra:observability` (Alloy :4317 → Tempo/Loki/Prometheus) |

## Instrument a service

Call **before** accepting traffic:

```ts
const observability = initializeObservability({
  enabled: true,
  serviceName: "identity-service", // must match deployable name
  serviceVersion: "0.0.0",
  environment: env.NODE_ENV,
  serviceNamespace: "pine",
  otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT, // local: http://127.0.0.1:4317
});
observability?.start(); // required; enabled:false → null
```

Env: `OTEL_EXPORTER_OTLP_ENDPOINT` in root `.env.example`.  
Instrumentations (package): HTTP, Fastify, GraphQL, TypeORM, pg.

Do **not** add one-off OTEL inside a feature folder. Extend `packages/observability/src/bootstrap/node-sdk.ts` only.

## Local stack

```bash
pnpm dev:infra:observability
```

Without the profile, **:4317 is closed**. Point services at **Alloy**, not Tempo directly.

Config: `infra/docker/observability/{config.alloy,tempo,loki,prometheus}.yaml`.  
Grafana password: `GRAFANA_ADMIN_PASSWORD` in root `.env`.
