import { ALL_PLATFORM_ROLES } from "@pine/authorization";
import {
  createCloudEvent,
  PlatformRoleAssignmentCreatedEvent,
  PlatformRoleAssignmentDeletedEvent,
  PlatformRoleCapabilitiesUpdatedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import type { DbClient, PlatformRoleAssignment } from "@/db";

const capabilityKeysForRole = (roleId: string, roleKey: string): readonly string[] => {
  const definition = ALL_PLATFORM_ROLES.find(
    (role) => role.id === roleId || role.key === roleKey,
  );
  return definition?.capabilityKeys ?? [];
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

export const schedulePlatformRoleAssignmentCreated = async (
  outboxService: IOutboxService,
  assignment: PlatformRoleAssignment,
  options?: { tx: DbClient },
): Promise<void> => {
  const event = createCloudEvent({
    type: PlatformRoleAssignmentCreatedEvent.type,
    version: PlatformRoleAssignmentCreatedEvent.version,
    schema: PlatformRoleAssignmentCreatedEvent.schema,
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
      eventVersion: PlatformRoleAssignmentCreatedEvent.version,
      aggregateType: "platform_role_assignment",
      aggregateId: assignment.id,
      payload: event,
    },
    options,
  );
};

export const schedulePlatformRoleAssignmentDeleted = async (
  outboxService: IOutboxService,
  assignment: Pick<PlatformRoleAssignment, "id" | "platformRoleId" | "identityId">,
  options?: { tx: DbClient },
): Promise<void> => {
  const event = createCloudEvent({
    type: PlatformRoleAssignmentDeletedEvent.type,
    version: PlatformRoleAssignmentDeletedEvent.version,
    schema: PlatformRoleAssignmentDeletedEvent.schema,
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
      eventVersion: PlatformRoleAssignmentDeletedEvent.version,
      aggregateType: "platform_role_assignment",
      aggregateId: assignment.id,
      payload: event,
    },
    options,
  );
};
