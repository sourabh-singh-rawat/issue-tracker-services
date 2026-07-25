import type { Client, DbClient } from "@/db";

export type ClientRepositoryOptions = { tx: DbClient };

export type ClientWithRelations = Client & {
  redirectUris: string[];
  scopes: string[];
  grantTypes: string[];
};

export interface IClientRepository {
  save(
    entity: Partial<Client> & { name: string },
    options?: ClientRepositoryOptions,
  ): Promise<Client>;
  update(
    id: string,
    entity: Partial<Pick<Client, "name" | "deletedAt" | "oauthProvider" | "providerClientId">>,
    options?: ClientRepositoryOptions,
  ): Promise<Client>;
  existsById(id: string): Promise<boolean>;
  softDelete(id: string, options?: ClientRepositoryOptions): Promise<void>;
  softDeleteWithRelations(id: string): Promise<boolean>;
  findById(id: string): Promise<Client | null>;
  findDetailsById(id: string): Promise<ClientWithRelations | null>;
  findAll(): Promise<Client[]>;
}
