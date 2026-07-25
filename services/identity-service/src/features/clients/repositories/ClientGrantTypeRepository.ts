import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type ClientGrantType, ClientGrantTypes, type Database } from "@/db";
import {
  type ClientGrantTypeRepositoryOptions,
  type IClientGrantTypeRepository,
} from "@/features/clients/repositories/IClientGrantTypeRepository";

@injectable()
export class ClientGrantTypeRepository implements IClientGrantTypeRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ClientGrantTypeRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<ClientGrantType> & { clientId: string; grantId: string },
    options?: ClientGrantTypeRepositoryOptions,
  ): Promise<ClientGrantType> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(ClientGrantTypes)
      .values({
        id: uuidv7(),
        clientId: entity.clientId,
        grantId: entity.grantId,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async saveMany(
    entities: Array<{ clientId: string; grantId: string }>,
    options?: ClientGrantTypeRepositoryOptions,
  ): Promise<ClientGrantType[]> {
    if (entities.length === 0) return [];

    const client = this.client(options);
    const now = new Date();

    return client
      .insert(ClientGrantTypes)
      .values(
        entities.map((entity) => ({
          id: uuidv7(),
          clientId: entity.clientId,
          grantId: entity.grantId,
          createdAt: now,
          version: 1,
        })),
      )
      .returning();
  }

  async findByClientId(clientId: string): Promise<ClientGrantType[]> {
    return this.db
      .select()
      .from(ClientGrantTypes)
      .where(and(eq(ClientGrantTypes.clientId, clientId), isNull(ClientGrantTypes.deletedAt)));
  }

  async softDelete(id: string, options?: ClientGrantTypeRepositoryOptions): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(ClientGrantTypes)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${ClientGrantTypes.version} + 1`,
      })
      .where(and(eq(ClientGrantTypes.id, id), isNull(ClientGrantTypes.deletedAt)));
  }
}
