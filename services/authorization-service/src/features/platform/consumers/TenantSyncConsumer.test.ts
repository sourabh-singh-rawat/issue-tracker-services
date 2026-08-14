import {
  PLATFORM_RESOURCE,
  PLATFORM_TENANT,
  TENANT,
  TENANT_PLATFORM,
} from "@pine/authorization";
import {
  createCloudEvent,
  TenantCreatedEvent,
  TenantDeletedEvent,
} from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { TenantSyncConsumer } from "@/features/platform/consumers/TenantSyncConsumer";

const createGraphProvider = () => ({
  listRelationships: vi.fn().mockResolvedValue([]),
  createRelationship: vi.fn().mockResolvedValue(undefined),
  deleteRelationship: vi.fn().mockResolvedValue(undefined),
  checkPermission: vi.fn().mockResolvedValue(false),
});

const createBroker = () => ({
  client: { jetstream: vi.fn() },
  init: vi.fn(),
  getConfig: vi.fn(),
});

describe("TenantSyncConsumer", () => {
  it("writes platform and tenant tuples when a tenant is created", async () => {
    const authorizationGraphProvider = createGraphProvider();
    const consumer = new TenantSyncConsumer(
      createBroker() as never,
      authorizationGraphProvider as never,
    );
    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: TenantCreatedEvent.type,
      version: TenantCreatedEvent.version,
      schema: TenantCreatedEvent.schema,
      source: "pine/platform-service",
      subject: "tenant-1",
      data: {
        id: "tenant-1",
        platformId: "platform-1",
        name: "Acme Corp",
        slug: "acme",
        isActive: true,
        version: 1,
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith({
      object: { type: PLATFORM_RESOURCE.name, id: "platform-1" },
      relation: PLATFORM_TENANT,
      subject: { type: TENANT.name, id: "tenant-1" },
    });
    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith({
      object: { type: TENANT.name, id: "tenant-1" },
      relation: TENANT_PLATFORM,
      subject: { type: PLATFORM_RESOURCE.name, id: "platform-1" },
    });
    expect(message.ack).toHaveBeenCalled();
  });

  it("deletes platform and tenant tuples when a tenant is deleted", async () => {
    const authorizationGraphProvider = createGraphProvider();
    authorizationGraphProvider.listRelationships.mockResolvedValue([
      {
        object: { type: PLATFORM_RESOURCE.name, id: "platform-1" },
        relation: PLATFORM_TENANT,
      },
    ]);
    const consumer = new TenantSyncConsumer(
      createBroker() as never,
      authorizationGraphProvider as never,
    );
    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: TenantDeletedEvent.type,
      version: TenantDeletedEvent.version,
      schema: TenantDeletedEvent.schema,
      source: "pine/platform-service",
      subject: "tenant-1",
      data: {
        id: "tenant-1",
        platformId: "platform-1",
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.deleteRelationship).toHaveBeenCalledWith({
      object: { type: PLATFORM_RESOURCE.name, id: "platform-1" },
      relation: PLATFORM_TENANT,
      subject: { type: TENANT.name, id: "tenant-1" },
    });
    expect(authorizationGraphProvider.deleteRelationship).toHaveBeenCalledWith({
      object: { type: TENANT.name, id: "tenant-1" },
      relation: TENANT_PLATFORM,
      subject: { type: PLATFORM_RESOURCE.name, id: "platform-1" },
    });
    expect(message.ack).toHaveBeenCalled();
  });
});
