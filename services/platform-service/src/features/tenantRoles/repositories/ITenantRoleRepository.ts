import type { DbClient, TenantRole } from "@/db";

export type TenantRoleRepositoryOptions = { tx: DbClient };

export type CreateTenantRoleEntity = {
  tenantId: string;
  key: string;
  name: string;
  description?: string | null;
};

export interface ITenantRoleRepository {
  save: (
    entity: CreateTenantRoleEntity,
    options?: TenantRoleRepositoryOptions,
  ) => Promise<TenantRole>;
  findById: (
    id: string,
    options?: TenantRoleRepositoryOptions,
  ) => Promise<TenantRole | null>;
  findByTenantId: (
    tenantId: string,
    options?: TenantRoleRepositoryOptions,
  ) => Promise<TenantRole[]>;
  findByTenantIdAndKey: (
    tenantId: string,
    key: string,
    options?: TenantRoleRepositoryOptions,
  ) => Promise<TenantRole | null>;
  existsByKeyInTenant: (
    tenantId: string,
    key: string,
    options?: TenantRoleRepositoryOptions,
  ) => Promise<boolean>;
}
