import type { DbClient, Identity } from "@/db";

export type IdentityRepositoryOptions = { tx?: DbClient };

export type CreateIdentityEntity = {
  id: string;
  displayName?: string | null;
};

export interface IIdentityRepository {
  save: (entity: CreateIdentityEntity, options?: IdentityRepositoryOptions) => Promise<Identity>;
  update: (
    id: string,
    entity: Partial<Pick<Identity, "displayName" | "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ) => Promise<Identity>;
  existsById: (id: string, options?: IdentityRepositoryOptions) => Promise<boolean>;
  findById: (id: string, options?: IdentityRepositoryOptions) => Promise<Identity | null>;
  findAll: () => Promise<Identity[]>;
}
