---
name: pine-events
description: >
  @pine/events NATS JetStream: CloudEvent publish/subscribe, TypeBox payloads,
  defineEvent contracts. Triggers: NATS, Subscriber, CloudEvent, publisher.send.
---

# Events (`@pine/events`)

## Wire format (production)

**CloudEvent envelopes** on NATS. Subject = CloudEvent `type` (e.g. `product.product.created`).

1. `NatsBroker` → streams with subjects `` `${stream}.>` `` (multi-token types)
2. `publisher.send(cloudEvent)` — no separate subject argument
3. `Subscriber<CloudEvent<T>>`: set `stream` / `consumer` / `subject = SomeEvent.type`; `validateEvent`; `message.ack()`

Stream names match the first token of `type`: `identity`, `issues`, `mail`, `product`.

## Hard rules

| Do                                                                   | Don’t                                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| `createCloudEvent` + `defineEvent` contract before publish           | Publish TypeORM entities / `UpdateResult` / bare objects  |
| Map entity fields to TypeBox schemas (`ownerUserId` ≠ `createdById`) | Send `new Date()` when schema wants number (`Date.now()`) |
| Filter subscribers with `SomeEvent.type`                             | Reintroduce a parallel `SUBJECTS` constant                |
| Start `fetchMessages()` after `broker.init()`                        | Import `@pine/event-bus`                                  |

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

Subscriber: `@injectable()`, `super(broker.client)`, start from `main.ts`.

## New event

1. TypeBox schema under `packages/events/src/services/<service>/schemas/`
2. `defineEvent({ type, version, schema })` contract
3. Stream/consumer constants if needed (`Streams`, `CONSUMERS`)
4. Publish via `createCloudEvent` + `publisher.send(event)`
5. Implement `Subscriber` with `subject = SomeEvent.type`; DI + `main.ts`
6. Cluster: `infra/k8s/nats-stream` + `nats-consumer` (`pine-k8s`) if applicable

## Package pitfalls

- Dockerfile must filter `@pine/events` (not `@pine/event-bus`)
- Prefer `main: dist` like peers when shipping built artifacts
