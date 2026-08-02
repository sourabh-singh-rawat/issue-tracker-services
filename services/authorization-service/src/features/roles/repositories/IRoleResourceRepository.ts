import type { DbClient, RoleResource } from "@/db";

export type RoleResourceRepositoryOptions = { tx: DbClient };

export type CreateRoleResourceEntity = {
  roleId: string;
  resourceId: string;
  relation: string;
};

export interface IRoleResourceRepository {
  saveMany(
    entities: CreateRoleResourceEntity[],
    options?: RoleResourceRepositoryOptions,
  ): Promise<RoleResource[]>;
  findByRoleId(roleId: string): Promise<RoleResource[]>;
  findResourceKeysByRoleId(roleId: string): Promise<string[]>;
  existsByRoleKeysAndResourceKeys(
    roleKeys: string[],
    resourceKeys: string[],
    relation?: string,
  ): Promise<boolean>;
  syncForRole(
    roleId: string,
    mappings: Array<{ resourceId: string; relation: string }>,
    options?: RoleResourceRepositoryOptions,
  ): Promise<void>;
}
