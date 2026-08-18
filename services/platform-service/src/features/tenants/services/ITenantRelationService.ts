export type TenantRelation = {
  id: string;
  tenantId: string;
  identityId: string;
  relation: string;
};

export type CreateTenantRelationInput = {
  tenantId: string;
  relation: string;
  identityId: string;
};

export type ListTenantRelationsInput = {
  tenantId: string;
  relation?: string;
  identityId?: string;
};

export type CreateTenantRelationOptions = {
  skipAuthorization?: boolean;
};

export interface ITenantRelationService {
  create: (
    input: CreateTenantRelationInput,
    identityId: string,
    options?: CreateTenantRelationOptions,
  ) => Promise<TenantRelation>;
  getById: (id: string, identityId: string) => Promise<TenantRelation>;
  list: (input: ListTenantRelationsInput, identityId: string) => Promise<TenantRelation[]>;
  delete: (id: string, identityId: string) => Promise<void>;
}
