import type { Identity, DbClient } from "@/db";

export type IdentityRepositoryOptions = { tx: DbClient };

export interface IIdentityRepository {
  save(
    entity: Partial<Identity> & { email: string },
    options?: IdentityRepositoryOptions,
  ): Promise<Identity>;
  update(
    id: string,
    entity: Partial<Pick<Identity, "email" | "idpId" | "idpProvider" | "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  softDelete(id: string, options?: IdentityRepositoryOptions): Promise<void>;
  findById(id: string): Promise<Identity | null>;
  findByEmail(email: string): Promise<Identity | null>;
  findAll(): Promise<Identity[]>;
}
