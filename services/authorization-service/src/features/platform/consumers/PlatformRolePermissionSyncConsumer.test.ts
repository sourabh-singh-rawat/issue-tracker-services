import { PERMISSION, PERMISSION_HAS, ROLE, ROLE_MEMBER } from "@pine/authorization";
import { createCloudEvent, PlatformRolePermissionsUpdatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { PlatformRolePermissionSyncConsumer } from "@/features/platform/consumers/PlatformRolePermissionSyncConsumer";

describe("PlatformRolePermissionSyncConsumer", () => {
  it("creates subject-set relationships in Keto for valid permission keys", async () => {
    const authorizationGraphProvider = {
      listRelationships: vi.fn().mockResolvedValue([]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
      checkPermission: vi.fn().mockResolvedValue(false),
    };
    const broker = {
      client: { jetstream: vi.fn() },
      init: vi.fn(),
      getConfig: vi.fn(),
    };

    const consumer = new PlatformRolePermissionSyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );

    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: PlatformRolePermissionsUpdatedEvent.type,
      version: PlatformRolePermissionsUpdatedEvent.version,
      schema: PlatformRolePermissionsUpdatedEvent.schema,
      source: "pine/platform-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        permissionKeys: ["platform:create_tenant"],
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.listRelationships).toHaveBeenCalledWith({
      object: { type: PERMISSION.name, id: "platform:create_tenant" },
      relation: PERMISSION_HAS,
      subjectSet: { type: ROLE.name, id: "role-1", relation: ROLE_MEMBER },
    });

    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith({
      object: { type: PERMISSION.name, id: "platform:create_tenant" },
      relation: PERMISSION_HAS,
      subjectSet: { type: ROLE.name, id: "role-1", relation: ROLE_MEMBER },
    });

    expect(message.ack).toHaveBeenCalled();
  });

  it("skips create when relationship already exists", async () => {
    const authorizationGraphProvider = {
      listRelationships: vi.fn().mockResolvedValue([
        {
          object: { type: PERMISSION.name, id: "platform:create_tenant" },
          relation: PERMISSION_HAS,
        },
      ]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
      checkPermission: vi.fn().mockResolvedValue(false),
    };
    const broker = {
      client: { jetstream: vi.fn() },
      getConfig: vi.fn(),
      init: vi.fn(),
    };

    const consumer = new PlatformRolePermissionSyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );
    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: PlatformRolePermissionsUpdatedEvent.type,
      version: PlatformRolePermissionsUpdatedEvent.version,
      schema: PlatformRolePermissionsUpdatedEvent.schema,
      source: "pine/platform-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        permissionKeys: ["platform:create_tenant"],
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.createRelationship).not.toHaveBeenCalled();
    expect(message.ack).toHaveBeenCalled();
  });

  it("skips invalid permission keys", async () => {
    const authorizationGraphProvider = {
      listRelationships: vi.fn().mockResolvedValue([]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
      checkPermission: vi.fn().mockResolvedValue(false),
    };
    const broker = {
      client: { jetstream: vi.fn() },
      init: vi.fn(),
      getConfig: vi.fn(),
    };

    const consumer = new PlatformRolePermissionSyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );
    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: PlatformRolePermissionsUpdatedEvent.type,
      version: PlatformRolePermissionsUpdatedEvent.version,
      schema: PlatformRolePermissionsUpdatedEvent.schema,
      source: "pine/platform-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        permissionKeys: ["not-a-permission", "brand:", ":read", "a:b:c"],
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.listRelationships).not.toHaveBeenCalled();
    expect(authorizationGraphProvider.createRelationship).not.toHaveBeenCalled();
    expect(message.ack).toHaveBeenCalled();
  });
});
