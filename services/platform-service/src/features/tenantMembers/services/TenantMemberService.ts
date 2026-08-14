import {
  TENANT,
  findTenantRoleDefinition,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import {
  createCloudEvent,
  TenantMemberCreatedEvent,
  TenantMemberDeletedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { DbClient, TenantMember } from "@/db";
import {
  TenantMemberConflictError,
  TenantMemberNotFoundError,
} from "@/features/tenantMembers/errors";
import type { ITenantMemberRepository } from "@/features/tenantMembers/repositories";
import type {
  CreateTenantMemberInput,
  CreateTenantMemberOptions,
  ITenantMemberService,
  ListTenantMembersInput,
  UpdateTenantMemberInput,
} from "@/features/tenantMembers/services/ITenantMemberService";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import { TenantRoleNotFoundError } from "@/features/tenantRoles/errors";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";

export const scheduleTenantMemberCreated = async (
  outboxService: IOutboxService,
  assignment: TenantMember,
  options?: { tx: DbClient },
): Promise<void> => {
  const event = createCloudEvent({
    type: TenantMemberCreatedEvent.type,
    version: TenantMemberCreatedEvent.version,
    schema: TenantMemberCreatedEvent.schema,
    source: "pine/platform-service",
    subject: assignment.id,
    data: {
      id: assignment.id,
      tenantRoleId: assignment.roleId,
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
      eventVersion: TenantMemberCreatedEvent.version,
      aggregateType: "tenant_member",
      aggregateId: assignment.id,
      payload: event,
    },
    options,
  );
};

@injectable()
export class TenantMemberService implements ITenantMemberService {
  constructor(
    @inject(TYPES.TenantMemberRepository)
    private readonly tenantMemberRepository: ITenantMemberRepository,
    @inject(TYPES.TenantRoleRepository)
    private readonly tenantRoleRepository: ITenantRoleRepository,
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
  ) {}

  async createTenantMember(
    input: CreateTenantMemberInput,
    userId: string,
    options?: CreateTenantMemberOptions,
  ): Promise<TenantMember> {
    const txOptions = options?.tx !== undefined ? { tx: options.tx } : undefined;

    if (!options?.skipAuthorization) {
      await requirePermission(this.authorizationClient, userId, "assign_admin", {
        namespace: TENANT.name,
        id: input.tenantId,
      });

      const tenant = await this.tenantRepository.findById(input.tenantId);
      if (!tenant) {
        throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
      }
    }

    const catalogRole = findTenantRoleDefinition({ id: input.roleId });
    if (!catalogRole) {
      const role = await this.tenantRoleRepository.findById(input.roleId);
      if (!role || role.tenantId !== input.tenantId) {
        throw new TenantRoleNotFoundError(`Tenant role not found: ${input.roleId}`);
      }
    }

    const existing = await this.tenantMemberRepository.findByTenantRoleAndIdentity(
      input.tenantId,
      input.roleId,
      input.identityId,
      txOptions,
    );
    if (existing) {
      throw new TenantMemberConflictError(
        `Tenant member already exists for role ${input.roleId} and identity ${input.identityId}`,
      );
    }

    const assignment = await this.tenantMemberRepository.save(
      {
        tenantId: input.tenantId,
        roleId: input.roleId,
        identityId: input.identityId,
        assignedBy: userId,
        expiresAt: input.expiresAt,
        reason: input.reason,
      },
      txOptions,
    );

    await scheduleTenantMemberCreated(this.outboxService, assignment, txOptions);
    return assignment;
  }

  async getTenantMemberById(id: string, userId: string): Promise<TenantMember> {
    const member = await this.tenantMemberRepository.findById(id);
    if (!member) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: TENANT.name,
      id: member.tenantId,
    });

    return member;
  }

  async listTenantMembers(
    input: ListTenantMembersInput,
    userId: string,
  ): Promise<TenantMember[]> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: TENANT.name,
      id: input.tenantId,
    });

    const tenant = await this.tenantRepository.findById(input.tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
    }

    if (input.roleId !== undefined) {
      const catalogRole = findTenantRoleDefinition({ id: input.roleId });
      if (!catalogRole) {
        const role = await this.tenantRoleRepository.findById(input.roleId);
        if (!role) {
          throw new TenantRoleNotFoundError(`Tenant role not found: ${input.roleId}`);
        }
      }
    }

    return this.tenantMemberRepository.findMany({
      tenantId: input.tenantId,
      roleId: input.roleId,
      identityId: input.identityId,
    });
  }

  async updateTenantMember(
    id: string,
    input: UpdateTenantMemberInput,
    userId: string,
  ): Promise<TenantMember> {
    const existing = await this.tenantMemberRepository.findById(id);
    if (!existing) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    await requirePermission(this.authorizationClient, userId, "assign_admin", {
      namespace: TENANT.name,
      id: existing.tenantId,
    });

    if (input.expiresAt === undefined && input.reason === undefined) {
      return existing;
    }

    const updated = await this.tenantMemberRepository.update(id, {
      ...(input.expiresAt !== undefined ? { expiresAt: input.expiresAt } : {}),
      ...(input.reason !== undefined ? { reason: input.reason } : {}),
    });

    if (!updated) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    return updated;
  }

  async deleteTenantMember(id: string, userId: string): Promise<void> {
    const existing = await this.tenantMemberRepository.findById(id);
    if (!existing) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    await requirePermission(this.authorizationClient, userId, "assign_admin", {
      namespace: TENANT.name,
      id: existing.tenantId,
    });

    const deleted = await this.tenantMemberRepository.softDelete(id);
    if (!deleted) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    const event = createCloudEvent({
      type: TenantMemberDeletedEvent.type,
      version: TenantMemberDeletedEvent.version,
      schema: TenantMemberDeletedEvent.schema,
      source: "pine/platform-service",
      subject: existing.id,
      data: {
        id: existing.id,
        tenantRoleId: existing.roleId,
        identityId: existing.identityId,
      },
    });

    await this.outboxService.schedule({
      eventId: event.id,
      eventType: event.type,
      eventVersion: TenantMemberDeletedEvent.version,
      aggregateType: "tenant_member",
      aggregateId: existing.id,
      payload: event,
    });
  }
}
