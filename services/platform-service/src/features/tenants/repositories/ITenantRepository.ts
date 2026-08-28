import type { Tenant, DbClient } from "@/db";

export type TenantRepositoryOptions = { tx: DbClient };

export type CreateTenantEntity = {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface ITenantRepository {
  save(
    entity: CreateTenantEntity,
    options?: TenantRepositoryOptions,
  ): Promise<Tenant>;
  findById(id: string): Promise<Tenant | null>;
  findByIds(ids: string[]): Promise<Tenant[]>;
  existsBySlug(slug: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  findAll(): Promise<Tenant[]>;
  softDelete(id: string, options?: TenantRepositoryOptions): Promise<boolean>;
}