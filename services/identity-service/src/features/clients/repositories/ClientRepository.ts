import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Client,
  ClientGrantTypes,
  ClientRedirectUris,
  ClientScopes,
  Clients,
  type Database,
  Grants,
  Scopes,
} from "@/db";
import {
  type ClientRepositoryOptions,
  type ClientWithRelations,
  type IClientRepository,
} from "@/features/clients/repositories/IClientRepository";

function uniqueNonNull(values: Array<string | null>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (value == null || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

@injectable()
export class ClientRepository implements IClientRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ClientRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<Client> & { name: string },
    options?: ClientRepositoryOptions,
  ): Promise<Client> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Clients)
      .values({
        id: uuidv7(),
        name: entity.name,
        oauthProvider: entity.oauthProvider,
        providerClientId: entity.providerClientId,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: Partial<Pick<Client, "name" | "deletedAt" | "oauthProvider" | "providerClientId">>,
    options?: ClientRepositoryOptions,
  ): Promise<Client> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Clients)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        ...(entity.oauthProvider !== undefined ? { oauthProvider: entity.oauthProvider } : {}),
        ...(entity.providerClientId !== undefined
          ? { providerClientId: entity.providerClientId }
          : {}),
        updatedAt: now,
        version: sql`${Clients.version} + 1`,
      })
      .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`Client not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string) {
    const row = await this.db
      .select({ id: Clients.id })
      .from(Clients)
      .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async softDelete(id: string, options?: ClientRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async softDeleteWithRelations(id: string): Promise<boolean> {
    return this.db.transaction(async (tx) => {
      const [client] = await tx
        .select({ id: Clients.id })
        .from(Clients)
        .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)))
        .limit(1);

      if (!client) {
        return false;
      }

      const now = new Date();
      const softDeleteSet = {
        deletedAt: now,
        updatedAt: now,
      };

      await Promise.all([
        tx
          .update(ClientRedirectUris)
          .set({
            ...softDeleteSet,
            version: sql`${ClientRedirectUris.version} + 1`,
          })
          .where(and(eq(ClientRedirectUris.clientId, id), isNull(ClientRedirectUris.deletedAt))),
        tx
          .update(ClientScopes)
          .set({
            ...softDeleteSet,
            version: sql`${ClientScopes.version} + 1`,
          })
          .where(and(eq(ClientScopes.clientId, id), isNull(ClientScopes.deletedAt))),
        tx
          .update(ClientGrantTypes)
          .set({
            ...softDeleteSet,
            version: sql`${ClientGrantTypes.version} + 1`,
          })
          .where(and(eq(ClientGrantTypes.clientId, id), isNull(ClientGrantTypes.deletedAt))),
      ]);

      await tx
        .update(Clients)
        .set({
          ...softDeleteSet,
          version: sql`${Clients.version} + 1`,
        })
        .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)));

      return true;
    });
  }

  async findById(id: string) {
    const [row] = await this.db
      .select()
      .from(Clients)
      .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findDetailsById(id: string): Promise<ClientWithRelations | null> {
    const rows = await this.db
      .select({
        id: Clients.id,
        name: Clients.name,
        oauthProvider: Clients.oauthProvider,
        providerClientId: Clients.providerClientId,
        createdAt: Clients.createdAt,
        updatedAt: Clients.updatedAt,
        deletedAt: Clients.deletedAt,
        version: Clients.version,
        redirectUri: ClientRedirectUris.uri,
        scopeName: Scopes.name,
        grantName: Grants.name,
      })
      .from(Clients)
      .leftJoin(
        ClientRedirectUris,
        and(eq(ClientRedirectUris.clientId, Clients.id), isNull(ClientRedirectUris.deletedAt)),
      )
      .leftJoin(
        ClientScopes,
        and(eq(ClientScopes.clientId, Clients.id), isNull(ClientScopes.deletedAt)),
      )
      .leftJoin(Scopes, and(eq(Scopes.id, ClientScopes.scopeId), isNull(Scopes.deletedAt)))
      .leftJoin(
        ClientGrantTypes,
        and(eq(ClientGrantTypes.clientId, Clients.id), isNull(ClientGrantTypes.deletedAt)),
      )
      .leftJoin(Grants, and(eq(Grants.id, ClientGrantTypes.grantId), isNull(Grants.deletedAt)))
      .where(and(eq(Clients.id, id), isNull(Clients.deletedAt)));

    if (rows.length === 0) {
      return null;
    }

    const first = rows[0];

    return {
      id: first.id,
      name: first.name,
      oauthProvider: first.oauthProvider,
      providerClientId: first.providerClientId,
      createdAt: first.createdAt,
      updatedAt: first.updatedAt,
      deletedAt: first.deletedAt,
      version: first.version,
      redirectUris: uniqueNonNull(rows.map((row) => row.redirectUri)),
      scopes: uniqueNonNull(rows.map((row) => row.scopeName)),
      grantTypes: uniqueNonNull(rows.map((row) => row.grantName)),
    };
  }

  async findAll() {
    return this.db
      .select()
      .from(Clients)
      .where(isNull(Clients.deletedAt))
      .orderBy(desc(Clients.createdAt));
  }
}
