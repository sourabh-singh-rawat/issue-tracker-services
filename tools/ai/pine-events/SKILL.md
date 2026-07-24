---
name: pine-events
description: >
  @pine/events NATS JetStream: SUBJECTS, publish/subscribe, TypeBox payloads,
  CloudEvents helpers (not on wire yet). Triggers: NATS, Subscriber, SUBJECTS, CloudEvent.
---

# Events (`@pine/events`)

## Wire format (production)

**Bare JSON data** on NATS subject. Not CloudEvent envelopes.

1. `NatsBroker` → streams with subjects `` `${stream}.*` ``
2. `publisher.send(SUBJECTS.*, payloadObject)`
3. `Subscriber<T>`: set `stream` / `consumer` / `subject`; decode body as `T`; `message.ack()`

CloudEvents (`defineEvent`, `createCloudEvent`, `identity.user.*` types) exist under `features/` but **publishers/subscribers do not use them yet**. Subject `user.registered` ≠ type `identity.user.registered`.

## Hard rules

| Do | Don’t |
|----|--------|
| Map to TypeBox data schemas in `features/*/schemas` | Publish TypeORM entities / `UpdateResult` |
| Align numbers vs ISO with schema (`Date.now()` vs `Type.Number()`) | Send `new Date()` when schema wants number |
| Start `fetchMessages()` after `broker.init()` | Assume identity still publishes `USER_*` events (verify call sites) |
| Import `@pine/events` | Import `@pine/event-bus` |

Field names often differ from entities (`ownerUserId` ≠ `createdById`).

## Bootstrap

```ts
// broker.ts
new NatsBroker({ servers, streams: ["user", "issue", ...], logger })

// container
TYPES.Publisher → new NatsPublisher(broker)
TYPES.Broker → broker
```

Subscriber: `@injectable()`, `super(broker.client)`, start from `main.ts`.

## New event

1. `constants/subjects.ts` (+ stream/consumer if new)
2. TypeBox schema under owning service folder in `packages/events/src/features/`
3. Optional `defineEvent` contract (for later CloudEvents cutover)
4. Publish mapped payload; implement `Subscriber` per consumer; DI + `main.ts`
5. Cluster: `infra/k8s/nats-stream` + `nats-consumer` (`pine-k8s`)

## Package pitfalls

- Dockerfile must filter `@pine/events` (not `@pine/event-bus`)
- Prefer `main: dist` like peers when shipping built artifacts
