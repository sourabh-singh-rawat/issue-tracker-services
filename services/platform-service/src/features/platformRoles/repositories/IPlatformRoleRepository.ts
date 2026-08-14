import type { DbClient, PlatformRole } from "@/db";

export type PlatformRoleRepositoryOptions = { tx: DbClient };

export type CreatePlatformRoleEntity = {
  key: string;
  name: string;
  description?: string | null;
};

export type UpdatePlatformRoleEntity = {
  name?: string;
  description?: string | null;
};

export interface IPlatformRoleRepository {
  save: (
    entity: CreatePlatformRoleEntity,
    options?: PlatformRoleRepositoryOptions,
  ) => Promise<PlatformRole>;
  update: (
    id: string,
    entity: UpdatePlatformRoleEntity,
    options?: PlatformRoleRepositoryOptions,
  ) => Promise<PlatformRole | null>;
  findById: (id: string) => Promise<PlatformRole | null>;
  findByKey: (key: string) => Promise<PlatformRole | null>;
  existsByKey: (key: string, excludeId?: string) => Promise<boolean>;
  existsByName: (name: string, excludeId?: string) => Promise<boolean>;
  findAll: () => Promise<PlatformRole[]>;
  softDelete: (id: string, options?: PlatformRoleRepositoryOptions) => Promise<boolean>;
}
