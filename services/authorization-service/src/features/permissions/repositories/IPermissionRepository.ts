import type { DbClient, Resource } from "@/db";

export type Permission = Resource;

export type PermissionRepositoryOptions = { tx: DbClient };

export type CreatePermissionEntity = {
  key: string;
  name: string;
  description?: string | null;
};

export type UpdatePermissionEntity = Partial<Pick<Permission, "name" | "description">>;

export interface IPermissionRepository {
  save(
    entity: CreatePermissionEntity,
    options?: PermissionRepositoryOptions,
  ): Promise<Permission>;
  update(
    key: string,
    entity: UpdatePermissionEntity,
    options?: PermissionRepositoryOptions,
  ): Promise<Permission>;
  existsByKey(key: string): Promise<boolean>;
  findByKey(key: string): Promise<Permission | null>;
  findByKeys(keys: string[]): Promise<Permission[]>;
  findAll(): Promise<Permission[]>;
}
