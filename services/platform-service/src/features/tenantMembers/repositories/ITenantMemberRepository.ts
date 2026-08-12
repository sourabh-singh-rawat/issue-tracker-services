import type { DbClient, TenantMember } from "@/db";

export type TenantMemberRepositoryOptions = { tx: DbClient };

export type CreateTenantMemberEntity = {
  tenantId: string;
  roleId: string;
  identityId: string;
  assignedBy?: string | null;
  assignedAt?: Date;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdateTenantMemberEntity = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListTenantMembersFilter = {
  tenantId?: string;
  roleId?: string;
  identityId?: string;
};

export interface ITenantMemberRepository {
  save: (
    entity: CreateTenantMemberEntity,
    options?: TenantMemberRepositoryOptions,
  ) => Promise<TenantMember>;
  update: (
    id: string,
    entity: UpdateTenantMemberEntity,
    options?: TenantMemberRepositoryOptions,
  ) => Promise<TenantMember | null>;
  findById: (id: string) => Promise<TenantMember | null>;
  findByTenantRoleAndIdentity: (
    tenantId: string,
    roleId: string,
    identityId: string,
  ) => Promise<TenantMember | null>;
  findMany: (filter?: ListTenantMembersFilter) => Promise<TenantMember[]>;
  softDelete: (
    id: string,
    options?: TenantMemberRepositoryOptions,
  ) => Promise<boolean>;
}
