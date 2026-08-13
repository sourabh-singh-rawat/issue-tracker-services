import type { TenantMember } from "@/db";

export type CreateTenantMemberInput = {
  tenantId: string;
  roleId: string;
  identityId: string;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdateTenantMemberInput = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListTenantMembersInput = {
  tenantId?: string;
  roleId?: string;
  identityId?: string;
};

export interface ITenantMemberService {
  createTenantMember: (
    input: CreateTenantMemberInput,
    userId: string,
  ) => Promise<TenantMember>;
  getTenantMemberById: (id: string, userId: string) => Promise<TenantMember>;
  listTenantMembers: (
    input: ListTenantMembersInput,
    userId: string,
  ) => Promise<TenantMember[]>;
  updateTenantMember: (
    id: string,
    input: UpdateTenantMemberInput,
    userId: string,
  ) => Promise<TenantMember>;
  deleteTenantMember: (id: string, userId: string) => Promise<void>;
}
