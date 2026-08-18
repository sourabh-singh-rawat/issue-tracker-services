---
name: pine-events
description: >
  @pine/events NATS JetStream: CloudEvent publish/subscribe, TypeBox payloads,
  defineEvent contracts. Triggers: NATS, Consumer, CloudEvent, publisher.send.
---

# Events (`@pine/events`)

## Wire format (production)

**CloudEvent envelopes** on NATS. Subject = CloudEvent `type` (e.g. `product.product.created`).

1. `NatsBroker` → streams with subjects `` `${stream}.>` `` (multi-token types)
2. `publisher.send(cloudEvent)` — no separate subject argument
3. `Consumer<CloudEvent<T>>`: set `stream` / `consumer` / `subjects = [SomeEvent.type, …]`; `validateEvent`; `message.ack()`

Stream names match the first token of `type`: `identity`, `issues`, `mail`, `product`.

## Hard rules

| Do                                                                   | Don’t                                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| `createCloudEvent` + `defineEvent` contract before publish           | Publish TypeORM entities / `UpdateResult` / bare objects  |
| Map entity fields to TypeBox schemas (`ownerUserId` ≠ `createdById`) | Send `new Date()` when schema wants number (`Date.now()`) |
| Filter consumers with `SomeEvent.type`                               | Reintroduce a parallel `SUBJECTS` constant                |
| Start consumers with `start()` after `broker.init()`                 | Import `@pine/event-bus`                                  |

## Bootstrap

```ts
// broker.ts — stream names = first type token
new NatsBroker({ servers, streams: ["identity", "product"], logger })

// container
TYPES.Publisher → new NatsPublisher(broker)
TYPES.Broker → broker
```

```ts
// publish
const event = createCloudEvent({
  type: ProductCreatedEvent.type,
  version: ProductCreatedEvent.version,
  schema: ProductCreatedEvent.schema,
  source: "pine/product-service",
  subject: product.id, // domain resource id, not NATS subject
  data: {/* mapped DTO */},
});
await this.publisher.send(event);
```

Consumer: `@injectable()`, `super(broker.client)`, call `start()` from `main.ts` (private `ensureConsumer` + `consume`). Colocate under `features/<feature>/consumers/`.

## New event

1. TypeBox schema under `packages/events/src/services/<service>/schemas/`
2. `defineEvent({ type, version, schema })` contract
3. Stream constants if needed (`Streams` in `@pine/events`)
4. Durable consumer name inline on the class: `readonly consumer = "<service>-<purpose>"`
5. Publish via `createCloudEvent` + `publisher.send(event)`
6. Implement `Consumer` with `subjects = [SomeEvent.type, …]`; DI + `main.ts`
7. Cluster: `infra/k8s/nats-stream` + `nats-consumer` (`pine-k8s`) if applicable

## Durable consumers

All JetStream consumers are **durable**. Names are **service-local** — never in `@pine/events` / common packages, and **not** a shared `CONSUMERS` enum/constants file.

Set the durable name **directly** on the consumer class (`readonly consumer = "…"`). That value is used as both `name` and `durable_name`.

**Convention:** `<service>-<purpose>` (short service token, not the full package name)

```ts
// features/identities/consumers/ProductIdentitySyncConsumer.ts
readonly consumer = "product-identity-sync";
```

| Service token  | Example durable name           |
| -------------- | ------------------------------ |
| `product`      | `product-identity-sync`        |
| `inventory`    | `inventory-brand-sync`         |
| `issues`       | `issues-identity-sync`         |
| `attachment`   | `attachment-identity-sync`     |
| `notification` | `notification-user-registered` |

- **service** = consuming service (who owns the durable cursor)
- **purpose** = projection or side-effect intent (`identity-sync`, `brand-sync`, `workspace-invite`, …), **not** one durable per event verb
- Group related events on one durable when they sync the same entity (e.g. brand created + updated → `inventory-brand-sync` with `filter_subjects`)
- One durable name per consumer class; never share across services

## Package pitfalls

- Dockerfile must filter `@pine/events` (not `@pine/event-bus`)
- Prefer `main: dist` like peers when shipping built artifacts
