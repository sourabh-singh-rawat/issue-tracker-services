import {
  TENANTS,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { TenantMember } from "@/db";
import {
  TenantMemberConflictError,
  TenantMemberNotFoundError,
} from "@/features/tenantMembers/errors";
import type { ITenantMemberRepository } from "@/features/tenantMembers/repositories";
import type {
  CreateTenantMemberInput,
  ITenantMemberService,
  ListTenantMembersInput,
  UpdateTenantMemberInput,
} from "@/features/tenantMembers/services/ITenantMemberService";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import { TenantRoleNotFoundError } from "@/features/tenantRoles/errors";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";

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
  ) {}

  async createTenantMember(
    input: CreateTenantMemberInput,
    userId: string,
  ): Promise<TenantMember> {
    await requireCapability(this.authorizationClient, userId, TENANTS.ASSIGN_ADMIN.key);

    const tenant = await this.tenantRepository.findById(input.tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
    }

    const role = await this.tenantRoleRepository.findById(input.roleId);
    if (!role || role.tenantId !== input.tenantId) {
      throw new TenantRoleNotFoundError(`Tenant role not found: ${input.roleId}`);
    }

    const existing = await this.tenantMemberRepository.findByTenantRoleAndIdentity(
      input.tenantId,
      input.roleId,
      input.identityId,
    );
    if (existing) {
      throw new TenantMemberConflictError(
        `Tenant member already exists for role ${input.roleId} and identity ${input.identityId}`,
      );
    }

    return this.tenantMemberRepository.save({
      tenantId: input.tenantId,
      roleId: input.roleId,
      identityId: input.identityId,
      assignedBy: userId,
      expiresAt: input.expiresAt,
      reason: input.reason,
    });
  }

  async getTenantMemberById(id: string, userId: string): Promise<TenantMember> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    const member = await this.tenantMemberRepository.findById(id);
    if (!member) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    return member;
  }

  async listTenantMembers(
    input: ListTenantMembersInput,
    userId: string,
  ): Promise<TenantMember[]> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    if (input.tenantId !== undefined) {
      const tenant = await this.tenantRepository.findById(input.tenantId);
      if (!tenant) {
        throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
      }
    }

    if (input.roleId !== undefined) {
      const role = await this.tenantRoleRepository.findById(input.roleId);
      if (!role) {
        throw new TenantRoleNotFoundError(`Tenant role not found: ${input.roleId}`);
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
    await requireCapability(this.authorizationClient, userId, TENANTS.ASSIGN_ADMIN.key);

    const existing = await this.tenantMemberRepository.findById(id);
    if (!existing) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

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
    await requireCapability(this.authorizationClient, userId, TENANTS.ASSIGN_ADMIN.key);

    const existing = await this.tenantMemberRepository.findById(id);
    if (!existing) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    const deleted = await this.tenantMemberRepository.softDelete(id);
    if (!deleted) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }
  }
}
