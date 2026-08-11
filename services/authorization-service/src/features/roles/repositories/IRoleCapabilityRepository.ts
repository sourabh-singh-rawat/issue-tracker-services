import type { DbClient, RoleCapability } from "@/db";

export type RoleCapabilityRepositoryOptions = { tx: DbClient };

export type CreateRoleCapabilityEntity = {
  roleId: string;
  capabilityId: string;
};

export interface IRoleCapabilityRepository {
  saveMany(
    entities: CreateRoleCapabilityEntity[],
    options?: RoleCapabilityRepositoryOptions,
  ): Promise<RoleCapability[]>;
  findByRoleId(roleId: string): Promise<RoleCapability[]>;
  findCapabilityKeysByRoleId(roleId: string): Promise<string[]>;
  syncForRole(
    roleId: string,
    capabilityIds: string[],
    options?: RoleCapabilityRepositoryOptions,
  ): Promise<void>;
}
