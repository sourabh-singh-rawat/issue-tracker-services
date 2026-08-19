import type { DbClient, Tenant } from "@/db";

export type TenantRepositoryOptions = { tx?: DbClient };

export type CreateTenantEntity = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

export interface ITenantRepository {
  save: (entity: CreateTenantEntity, options?: TenantRepositoryOptions) => Promise<Tenant>;
  findById: (id: string, options?: TenantRepositoryOptions) => Promise<Tenant | null>;
  existsById: (id: string, options?: TenantRepositoryOptions) => Promise<boolean>;
  deactivate: (id: string, options?: TenantRepositoryOptions) => Promise<void>;
}
