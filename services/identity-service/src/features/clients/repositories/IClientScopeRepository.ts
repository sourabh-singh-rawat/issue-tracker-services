import type { ClientScope, DbClient } from "@/db";

export type ClientScopeRepositoryOptions = { tx: DbClient };

export interface IClientScopeRepository {
  save(
    entity: Partial<ClientScope> & { clientId: string; scopeId: string },
    options?: ClientScopeRepositoryOptions,
  ): Promise<ClientScope>;
  saveMany(
    entities: Array<{ clientId: string; scopeId: string }>,
    options?: ClientScopeRepositoryOptions,
  ): Promise<ClientScope[]>;
  findByClientId(clientId: string): Promise<ClientScope[]>;
  softDelete(id: string, options?: ClientScopeRepositoryOptions): Promise<void>;
}
