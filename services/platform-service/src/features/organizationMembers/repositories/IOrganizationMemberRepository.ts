import type { DbClient, OrganizationMember } from "@/db";

export type OrganizationMemberRepositoryOptions = { tx: DbClient };

export type CreateOrganizationMemberEntity = {
  organizationId: string;
  roleId: string;
  identityId: string;
  assignedBy?: string | null;
  assignedAt?: Date;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListOrganizationMembersFilter = {
  organizationId?: string;
  roleId?: string;
  identityId?: string;
};

export interface IOrganizationMemberRepository {
  save: (
    entity: CreateOrganizationMemberEntity,
    options?: OrganizationMemberRepositoryOptions,
  ) => Promise<OrganizationMember>;
  findById: (id: string) => Promise<OrganizationMember | null>;
  findByOrganizationRoleAndIdentity: (
    organizationId: string,
    roleId: string,
    identityId: string,
  ) => Promise<OrganizationMember | null>;
  findMany: (filter?: ListOrganizationMembersFilter) => Promise<OrganizationMember[]>;
}
