import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type ClientRedirectUri, ClientRedirectUris, type Database } from "@/db";
import {
  type ClientRedirectUriRepositoryOptions,
  type IClientRedirectUriRepository,
} from "@/features/clients/repositories/IClientRedirectUriRepository";

@injectable()
export class ClientRedirectUriRepository implements IClientRedirectUriRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ClientRedirectUriRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<ClientRedirectUri> & { clientId: string; uri: string },
    options?: ClientRedirectUriRepositoryOptions,
  ): Promise<ClientRedirectUri> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(ClientRedirectUris)
      .values({
        id: uuidv7(),
        clientId: entity.clientId,
        uri: entity.uri,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async saveMany(
    entities: Array<{ clientId: string; uri: string }>,
    options?: ClientRedirectUriRepositoryOptions,
  ): Promise<ClientRedirectUri[]> {
    if (entities.length === 0) return [];

    const client = this.client(options);
    const now = new Date();

    return client
      .insert(ClientRedirectUris)
      .values(
        entities.map((entity) => ({
          id: uuidv7(),
          clientId: entity.clientId,
          uri: entity.uri,
          createdAt: now,
          version: 1,
        })),
      )
      .returning();
  }

  async findByClientId(clientId: string): Promise<ClientRedirectUri[]> {
    return this.db
      .select()
      .from(ClientRedirectUris)
      .where(and(eq(ClientRedirectUris.clientId, clientId), isNull(ClientRedirectUris.deletedAt)));
  }

  async softDelete(id: string, options?: ClientRedirectUriRepositoryOptions): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(ClientRedirectUris)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${ClientRedirectUris.version} + 1`,
      })
      .where(and(eq(ClientRedirectUris.id, id), isNull(ClientRedirectUris.deletedAt)));
  }
}
