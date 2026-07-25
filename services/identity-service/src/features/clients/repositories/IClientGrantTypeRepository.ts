import type { ClientGrantType, DbClient } from "@/db";

export type ClientGrantTypeRepositoryOptions = { tx: DbClient };

export interface IClientGrantTypeRepository {
  save(
    entity: Partial<ClientGrantType> & { clientId: string; grantId: string },
    options?: ClientGrantTypeRepositoryOptions,
  ): Promise<ClientGrantType>;
  saveMany(
    entities: Array<{ clientId: string; grantId: string }>,
    options?: ClientGrantTypeRepositoryOptions,
  ): Promise<ClientGrantType[]>;
  findByClientId(clientId: string): Promise<ClientGrantType[]>;
  softDelete(id: string, options?: ClientGrantTypeRepositoryOptions): Promise<void>;
}
