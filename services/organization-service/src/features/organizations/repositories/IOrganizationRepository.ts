import type { Organization, DbClient } from "@/db";

export type OrganizationRepositoryOptions = { tx: DbClient };

export type CreateOrganizationEntity = {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface IOrganizationRepository {
  save(
    entity: CreateOrganizationEntity,
    options?: OrganizationRepositoryOptions,
  ): Promise<Organization>;
  existsBySlug(slug: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  findAll(): Promise<Organization[]>;
  /**
   * Soft-deletes an organization. Returns true when a non-deleted row was updated.
   */
  softDelete(id: string, options?: OrganizationRepositoryOptions): Promise<boolean>;
}
