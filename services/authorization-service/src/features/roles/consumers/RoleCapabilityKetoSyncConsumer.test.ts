import { describe, expect, it, vi } from "vitest";
import { createCloudEvent, RoleCapabilityUpdatedEvent } from "@pine/events";
import { RoleCapabilityKetoSyncConsumer } from "@/features/roles/consumers/RoleCapabilityKetoSyncConsumer";

describe("RoleCapabilityKetoSyncConsumer", () => {
  it("creates subject-set relationships in Keto for valid capability keys", async () => {
    const authorizationGraphProvider = {
      listRelationships: vi.fn().mockResolvedValue([]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
    };
    const broker = {
      client: { jetstream: vi.fn() },
    };

    const consumer = new RoleCapabilityKetoSyncConsumer(
      broker as never,
      authorizationGraphProvider as never,
    );

    const message = { ack: vi.fn() };
    const event = createCloudEvent({
      type: RoleCapabilityUpdatedEvent.type,
      version: RoleCapabilityUpdatedEvent.version,
      schema: RoleCapabilityUpdatedEvent.schema,
      source: "pine/authorization-service",
      subject: "role-1",
      data: {
        roleId: "role-1",
        capabilityKeys: ["org:123:view"],
      },
    });

    await consumer.onMessage(message as never, event as never);

    expect(authorizationGraphProvider.listRelationships).toHaveBeenCalledWith({
      object: { type: "capability", id: "org:123:view" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "assignee" },
    });

    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "org:123:view" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "assignee" },
    });

    expect(message.ack).toHaveBeenCalled();
  });
});
