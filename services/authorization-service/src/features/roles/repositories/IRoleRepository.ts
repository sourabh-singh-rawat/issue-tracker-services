import type { Role, DbClient } from "@/db";

export type RoleRepositoryOptions = { tx: DbClient };

export type CreateRoleEntity = {
  id?: string;
  key: string;
  name: string;
  description?: string | null;
};

export type UpdateRoleEntity = Partial<Pick<Role, "name" | "description">>;

export interface IRoleRepository {
  save(entity: CreateRoleEntity, options?: RoleRepositoryOptions): Promise<Role>;
  update(id: string, entity: UpdateRoleEntity, options?: RoleRepositoryOptions): Promise<Role>;
  existsById(id: string): Promise<boolean>;
  existsByKey(key: string): Promise<boolean>;
  existsByName(name: string, excludeId?: string): Promise<boolean>;
  findById(id: string): Promise<Role | null>;
  findByKey(key: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  upsertById(entity: CreateRoleEntity & { id: string }, options?: RoleRepositoryOptions): Promise<Role>;
}
