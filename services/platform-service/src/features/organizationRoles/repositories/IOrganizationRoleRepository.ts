import type { DbClient, OrganizationRole } from "@/db";

export type OrganizationRoleRepositoryOptions = { tx: DbClient };

export type CreateOrganizationRoleEntity = {
  organizationId: string;
  key: string;
  name: string;
  description?: string | null;
};

export interface IOrganizationRoleRepository {
  save: (
    entity: CreateOrganizationRoleEntity,
    options?: OrganizationRoleRepositoryOptions,
  ) => Promise<OrganizationRole>;
  findById: (
    id: string,
    options?: OrganizationRoleRepositoryOptions,
  ) => Promise<OrganizationRole | null>;
  findByOrganizationId: (
    organizationId: string,
    options?: OrganizationRoleRepositoryOptions,
  ) => Promise<OrganizationRole[]>;
  findByOrganizationIdAndKey: (
    organizationId: string,
    key: string,
    options?: OrganizationRoleRepositoryOptions,
  ) => Promise<OrganizationRole | null>;
  existsByKeyInOrganization: (
    organizationId: string,
    key: string,
    options?: OrganizationRoleRepositoryOptions,
  ) => Promise<boolean>;
}
