import type { ClientRedirectUri, DbClient } from "@/db";

export type ClientRedirectUriRepositoryOptions = { tx: DbClient };

export interface IClientRedirectUriRepository {
  save(
    entity: Partial<ClientRedirectUri> & { clientId: string; uri: string },
    options?: ClientRedirectUriRepositoryOptions,
  ): Promise<ClientRedirectUri>;
  saveMany(
    entities: Array<{ clientId: string; uri: string }>,
    options?: ClientRedirectUriRepositoryOptions,
  ): Promise<ClientRedirectUri[]>;
  findByClientId(clientId: string): Promise<ClientRedirectUri[]>;
  softDelete(id: string, options?: ClientRedirectUriRepositoryOptions): Promise<void>;
}
