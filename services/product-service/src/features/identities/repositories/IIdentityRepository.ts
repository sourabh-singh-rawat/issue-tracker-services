import type { DbClient, Identity } from "@/db";

export type IdentityRepositoryOptions = { tx?: DbClient };

export type CreateIdentityEntity = {
  id: string;
};

export interface IIdentityRepository {
  save(entity: CreateIdentityEntity, options?: IdentityRepositoryOptions): Promise<Identity>;
  update(
    id: string,
    entity: Partial<Pick<Identity, "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity>;
  existsById(id: string, options?: IdentityRepositoryOptions): Promise<boolean>;
  softDelete(id: string, options?: IdentityRepositoryOptions): Promise<void>;
  findById(id: string, options?: IdentityRepositoryOptions): Promise<Identity | null>;
  findAll(): Promise<Identity[]>;
}
