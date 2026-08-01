import type { Identity, DbClient } from "@/db";

export type IdentityRepositoryOptions = { tx: DbClient };

export interface IIdentityRepository {
  save(
    entity: Partial<Identity> & { idpId: string; idpProvider: string },
    options?: IdentityRepositoryOptions,
  ): Promise<Identity>;
  update(
    id: string,
    entity: Partial<Pick<Identity, "idpId" | "idpProvider" | "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity>;
  existsById(id: string): Promise<boolean>;
  existsByIdpId(idpId: string): Promise<boolean>;
  softDelete(id: string, options?: IdentityRepositoryOptions): Promise<void>;
  findById(id: string): Promise<Identity | null>;
  findByIdpId(idpId: string): Promise<Identity | null>;
  findAll(): Promise<Identity[]>;
}
