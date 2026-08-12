import { ALL_PLATFORM_ROLES } from "@pine/authorization";
import {
  createCloudEvent,
  PlatformMemberCreatedEvent,
  PlatformMemberDeletedEvent,
  PlatformRoleCapabilitiesUpdatedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import type { DbClient, PlatformMember } from "@/db";

const capabilityKeysForRole = (roleId: string, roleKey: string): readonly string[] => {
  for (const definition of ALL_PLATFORM_ROLES) {
    if (definition.id === roleId || definition.key === roleKey) {
      return definition.capabilityKeys;
    }
  }
  return [];
};

export const schedulePlatformRoleCapabilitiesUpdated = async (
  outboxService: IOutboxService,
  roleId: string,
  roleKey: string,
  options?: { tx: DbClient },
): Promise<void> => {
  const capabilityKeys = [...capabilityKeysForRole(roleId, roleKey)];
  if (capabilityKeys.length === 0) {
    return;
  }

  const event = createCloudEvent({
    type: PlatformRoleCapabilitiesUpdatedEvent.type,
    version: PlatformRoleCapabilitiesUpdatedEvent.version,
    schema: PlatformRoleCapabilitiesUpdatedEvent.schema,
    source: "pine/platform-service",
    subject: roleId,
    data: {
      roleId,
      capabilityKeys,
    },
  });

  await outboxService.schedule(
    {
      eventId: event.id,
      eventType: event.type,
      eventVersion: PlatformRoleCapabilitiesUpdatedEvent.version,
      aggregateType: "platform_role",
      aggregateId: roleId,
      payload: event,
    },
    options,
  );
};

export const schedulePlatformMemberCreated = async (
  outboxService: IOutboxService,
  assignment: PlatformMember,
  options?: { tx: DbClient },
): Promise<void> => {
  const event = createCloudEvent({
    type: PlatformMemberCreatedEvent.type,
    version: PlatformMemberCreatedEvent.version,
    schema: PlatformMemberCreatedEvent.schema,
    source: "pine/platform-service",
    subject: assignment.id,
    data: {
      id: assignment.id,
      platformRoleId: assignment.platformRoleId,
      identityId: assignment.identityId,
      assignedBy: assignment.assignedBy,
      assignedAt: assignment.assignedAt.toISOString(),
      expiresAt: assignment.expiresAt?.toISOString() ?? null,
      reason: assignment.reason,
    },
  });

  await outboxService.schedule(
    {
      eventId: event.id,
      eventType: event.type,
      eventVersion: PlatformMemberCreatedEvent.version,
      aggregateType: "platform_member",
      aggregateId: assignment.id,
      payload: event,
    },
    options,
  );
};

export const schedulePlatformMemberDeleted = async (
  outboxService: IOutboxService,
  assignment: Pick<PlatformMember, "id" | "platformRoleId" | "identityId">,
  options?: { tx: DbClient },
): Promise<void> => {
  const event = createCloudEvent({
    type: PlatformMemberDeletedEvent.type,
    version: PlatformMemberDeletedEvent.version,
    schema: PlatformMemberDeletedEvent.schema,
    source: "pine/platform-service",
    subject: assignment.id,
    data: {
      id: assignment.id,
      platformRoleId: assignment.platformRoleId,
      identityId: assignment.identityId,
    },
  });

  await outboxService.schedule(
    {
      eventId: event.id,
      eventType: event.type,
      eventVersion: PlatformMemberDeletedEvent.version,
      aggregateType: "platform_member",
      aggregateId: assignment.id,
      payload: event,
    },
    options,
  );
};
