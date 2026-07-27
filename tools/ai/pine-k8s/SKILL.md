---
name: pine-k8s
description: >
  Helm/K8s under infra/k8s: microservice chart, PGO Postgres, NATS streams/consumers.
  Triggers: helm, deploy, nats-consumer, GKE, infra/k8s.
---

# Kubernetes

Playbook: `docs/commands/install-k8s.md`. GKE: `docs/commands/gcloud.md`.  
Local dev uses Compose (`pine-docker-infra`), not these charts.

## Layout

```text
infra/k8s/
  microservice/   # Deployment+Service + *.values.yaml per service
  postgres/  pgo/ # cluster chart + operator/CRDs
  nats/  nats-stream/  nats-consumer/
  ingress/  secrets/  dashboard/
```

## Install order

1. Dashboard (optional) → 2. Ingress → 3. Secrets → 4. PGO
2. Per-service Postgres → 6. NATS + nack → 7. Streams → 8. Consumers → 9. Microservices

Stream/consumer names must match `@pine/events` (`pine-events`).

## Microservice values

Edit values, don’t fork the chart:

```yaml
replicaCount: 1
container:
  image: sourabhrawatcc/<service>
  exposedPort: 4000
jwtSecretRef: jwt-secret
```

Env secrets come from PGO user secret naming `{release}-postgres-pguser-{release}-postgres` (+ optional JWT/SMTP refs). Values files still use some legacy names (`issue-tracker`, `email`) — map to current package names carefully.

## New event on cluster

1. Code: `@pine/events` subject + payload (`pine-events`)
2. `nats-stream` if new stream
3. `nats-consumer/values/*.yaml` durable
4. Names consistent with subjects (`user.registered`, `issue.created`, …)

## Rules

- Image/tag changes in values only
- No hand-applied Deployments that duplicate the chart
- Committed secrets are templates — never real prod secrets
- Destructive ops (delete release, scale cluster to 0) → confirm with user
