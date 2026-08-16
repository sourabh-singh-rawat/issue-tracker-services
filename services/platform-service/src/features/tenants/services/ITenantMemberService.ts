export type TenantMember = {
  id: string;
  tenantId: string;
  identityId: string;
  relation: string;
};

export type CreateTenantMemberInput = {
  tenantId: string;
  relation: string;
  identityId: string;
};

export type ListTenantMembersInput = {
  tenantId: string;
  relation?: string;
  identityId?: string;
};

export type CreateTenantMemberOptions = {
  skipAuthorization?: boolean;
};

export interface ITenantMemberService {
  create: (
    input: CreateTenantMemberInput,
    identityId: string,
    options?: CreateTenantMemberOptions,
  ) => Promise<TenantMember>;
  getById: (id: string, identityId: string) => Promise<TenantMember>;
  list: (input: ListTenantMembersInput, identityId: string) => Promise<TenantMember[]>;
  delete: (id: string, identityId: string) => Promise<void>;
}
