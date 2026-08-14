import {
  PLATFORM_RESOURCE,
  findPlatformRoleDefinition,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import {
  createCloudEvent,
  PlatformMemberCreatedEvent,
  PlatformMemberDeletedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, DbClient, PlatformMember } from "@/db";
import {
  PlatformMemberConflictError,
  PlatformMemberNotFoundError,
} from "@/features/platformMembers/errors";
import type { IPlatformMemberRepository } from "@/features/platformMembers/repositories";
import type {
  CreatePlatformMemberInput,
  IPlatformMemberService,
  ListPlatformMembersInput,
  UpdatePlatformMemberInput,
} from "@/features/platformMembers/services/IPlatformMemberService";
import { PlatformRoleNotFoundError } from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";
import { schedulePlatformRolePermissionsUpdated } from "@/features/platformRoles/services/PlatformRoleService";

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

@injectable()
export class PlatformMemberService implements IPlatformMemberService {
  constructor(
    @inject(TYPES.PlatformMemberRepository)
    private readonly platformMemberRepository: IPlatformMemberRepository,
    @inject(TYPES.PlatformRoleRepository)
    private readonly platformRoleRepository: IPlatformRoleRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createPlatformMember(
    input: CreatePlatformMemberInput,
    userId: string,
  ): Promise<PlatformMember> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: input.platformId,
    });

    const catalogRole = findPlatformRoleDefinition({ id: input.platformRoleId });
    const storedRole = catalogRole
      ? null
      : await this.platformRoleRepository.findById(input.platformRoleId);
    if (!catalogRole && !storedRole) {
      throw new PlatformRoleNotFoundError(
        `Platform role not found: ${input.platformRoleId}`,
      );
    }

    const roleId = catalogRole?.id ?? storedRole?.id;
    const roleKey = catalogRole?.key ?? storedRole?.key;
    if (!roleId || !roleKey) {
      throw new PlatformRoleNotFoundError(
        `Platform role not found: ${input.platformRoleId}`,
      );
    }

    const existing = await this.platformMemberRepository.findByRoleAndIdentity(
      input.platformRoleId,
      input.identityId,
    );
    if (existing) {
      throw new PlatformMemberConflictError(
        `Platform member already exists for role ${input.platformRoleId} and identity ${input.identityId}`,
      );
    }

    return this.db.transaction(async (tx) => {
      const assignment = await this.platformMemberRepository.save(
        {
          platformRoleId: input.platformRoleId,
          identityId: input.identityId,
          assignedBy: userId,
          expiresAt: input.expiresAt,
          reason: input.reason,
        },
        { tx },
      );

      await schedulePlatformRolePermissionsUpdated(
        this.outboxService,
        roleId,
        roleKey,
        { tx },
      );
      await schedulePlatformMemberCreated(this.outboxService, assignment, { tx });

      return assignment;
    });
  }

  async getPlatformMemberById(
    id: string,
    platformId: string,
    userId: string,
  ): Promise<PlatformMember> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    const assignment = await this.platformMemberRepository.findById(id);
    if (!assignment) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    return assignment;
  }

  async listPlatformMembers(
    input: ListPlatformMembersInput,
    userId: string,
  ): Promise<PlatformMember[]> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: PLATFORM_RESOURCE.name,
      id: input.platformId,
    });

    if (input.platformRoleId !== undefined) {
      const catalogRole = findPlatformRoleDefinition({ id: input.platformRoleId });
      if (!catalogRole) {
        const role = await this.platformRoleRepository.findById(input.platformRoleId);
        if (!role) {
          throw new PlatformRoleNotFoundError(
            `Platform role not found: ${input.platformRoleId}`,
          );
        }
      }
    }

    return this.platformMemberRepository.findMany({
      platformRoleId: input.platformRoleId,
      identityId: input.identityId,
    });
  }

  async updatePlatformMember(
    id: string,
    input: UpdatePlatformMemberInput,
    platformId: string,
    userId: string,
  ): Promise<PlatformMember> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    const existing = await this.platformMemberRepository.findById(id);
    if (!existing) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    if (input.expiresAt === undefined && input.reason === undefined) {
      return existing;
    }

    const updated = await this.platformMemberRepository.update(id, {
      ...(input.expiresAt !== undefined ? { expiresAt: input.expiresAt } : {}),
      ...(input.reason !== undefined ? { reason: input.reason } : {}),
    });

    if (!updated) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    return updated;
  }

  async deletePlatformMember(id: string, platformId: string, userId: string): Promise<void> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    const existing = await this.platformMemberRepository.findById(id);
    if (!existing) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    await this.db.transaction(async (tx) => {
      const deleted = await this.platformMemberRepository.softDelete(id, { tx });
      if (!deleted) {
        throw new PlatformMemberNotFoundError(
          `Platform member not found: ${id}`,
        );
      }

      await schedulePlatformMemberDeleted(this.outboxService, existing, { tx });
    });
  }
}
