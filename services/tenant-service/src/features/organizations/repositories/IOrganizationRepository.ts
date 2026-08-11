import type { DbClient, Organization } from "@/db";

export type OrganizationRepositoryOptions = { tx: DbClient };

export type CreateOrganizationEntity = {
  tenantId: string;
  parentOrganizationId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export type ListOrganizationsFilter = {
  tenantId: string;
  parentOrganizationId?: string | null;
};

export interface IOrganizationRepository {
  save(
    entity: CreateOrganizationEntity,
    options?: OrganizationRepositoryOptions,
  ): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  existsBySlugInTenant(tenantId: string, slug: string): Promise<boolean>;
  existsByNameInTenant(tenantId: string, name: string): Promise<boolean>;
  findMany(filter: ListOrganizationsFilter): Promise<Organization[]>;
  softDelete(id: string, options?: OrganizationRepositoryOptions): Promise<boolean>;
}
