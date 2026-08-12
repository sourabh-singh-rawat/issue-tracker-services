import { CAPABILITY, CAPABILITY_HAS, ROLE, ROLE_ASSIGNEE } from "@pine/authorization";
import { createCloudEvent, PlatformRoleCapabilitiesUpdatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { PlatformRoleCapabilitySyncConsumer } from "@/features/platform/consumers/PlatformRoleCapabilitySyncConsumer";

describe("PlatformRoleCapabilitySyncConsumer", () => {
  it("creates subject-set relationships in Keto for valid capability keys", async () => {
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

    const consumer = new PlatformRoleCapabilitySyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );

    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: PlatformRoleCapabilitiesUpdatedEvent.type,
      version: PlatformRoleCapabilitiesUpdatedEvent.version,
      schema: PlatformRoleCapabilitiesUpdatedEvent.schema,
      source: "pine/platform-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        capabilityKeys: ["platform:tenant:create"],
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.listRelationships).toHaveBeenCalledWith({
      object: { type: CAPABILITY.name, id: "platform:tenant:create" },
      relation: CAPABILITY_HAS,
      subjectSet: { type: ROLE.name, id: "role-1", relation: ROLE_ASSIGNEE },
    });

    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith({
      object: { type: CAPABILITY.name, id: "platform:tenant:create" },
      relation: CAPABILITY_HAS,
      subjectSet: { type: ROLE.name, id: "role-1", relation: ROLE_ASSIGNEE },
    });

    expect(message.ack).toHaveBeenCalled();
  });

  it("skips create when relationship already exists", async () => {
    const authorizationGraphProvider = {
      listRelationships: vi.fn().mockResolvedValue([
        {
          object: { type: CAPABILITY.name, id: "platform:tenant:create" },
          relation: CAPABILITY_HAS,
        },
      ]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
      checkPermission: vi.fn().mockResolvedValue(false),
    };
    const broker = {
      client: { jetstream: vi.fn() },
      init: vi.fn(),
      getConfig: vi.fn(),
    };

    const consumer = new PlatformRoleCapabilitySyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );
    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: PlatformRoleCapabilitiesUpdatedEvent.type,
      version: PlatformRoleCapabilitiesUpdatedEvent.version,
      schema: PlatformRoleCapabilitiesUpdatedEvent.schema,
      source: "pine/platform-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        capabilityKeys: ["platform:tenant:create"],
      },
    });

    await consumer.onMessage(message as never, event);

    expect(authorizationGraphProvider.createRelationship).not.toHaveBeenCalled();
    expect(message.ack).toHaveBeenCalled();
  });
});
