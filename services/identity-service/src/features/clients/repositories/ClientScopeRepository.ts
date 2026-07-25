import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type ClientScope, ClientScopes, type Database } from "@/db";
import {
  type ClientScopeRepositoryOptions,
  type IClientScopeRepository,
} from "@/features/clients/repositories/IClientScopeRepository";

@injectable()
export class ClientScopeRepository implements IClientScopeRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ClientScopeRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<ClientScope> & { clientId: string; scopeId: string },
    options?: ClientScopeRepositoryOptions,
  ): Promise<ClientScope> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(ClientScopes)
      .values({
        id: uuidv7(),
        clientId: entity.clientId,
        scopeId: entity.scopeId,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async saveMany(
    entities: Array<{ clientId: string; scopeId: string }>,
    options?: ClientScopeRepositoryOptions,
  ): Promise<ClientScope[]> {
    if (entities.length === 0) return [];

    const client = this.client(options);
    const now = new Date();

    return client
      .insert(ClientScopes)
      .values(
        entities.map((entity) => ({
          id: uuidv7(),
          clientId: entity.clientId,
          scopeId: entity.scopeId,
          createdAt: now,
          version: 1,
        })),
      )
      .returning();
  }

  async findByClientId(clientId: string): Promise<ClientScope[]> {
    return this.db
      .select()
      .from(ClientScopes)
      .where(and(eq(ClientScopes.clientId, clientId), isNull(ClientScopes.deletedAt)));
  }

  async softDelete(id: string, options?: ClientScopeRepositoryOptions): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(ClientScopes)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${ClientScopes.version} + 1`,
      })
      .where(and(eq(ClientScopes.id, id), isNull(ClientScopes.deletedAt)));
  }
}
