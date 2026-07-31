import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Identity, Identities } from "@/db";
import type {
  CreateIdentityEntity,
  IIdentityRepository,
  IdentityRepositoryOptions,
} from "@/features/identities/repositories/IIdentityRepository";

@injectable()
export class IdentityRepository implements IIdentityRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: IdentityRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateIdentityEntity,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Identities)
      .values({
        id: entity.id,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: Partial<Pick<Identity, "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Identities)
      .set({
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        updatedAt: now,
        version: sql`${Identities.version} + 1`,
      })
      .where(and(eq(Identities.id, id), isNull(Identities.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`Identity not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string, options?: IdentityRepositoryOptions): Promise<boolean> {
    const identity = await this.findById(id, options);
    return identity != null;
  }

  async softDelete(id: string, options?: IdentityRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async findById(id: string, options?: IdentityRepositoryOptions): Promise<Identity | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(Identities)
      .where(and(eq(Identities.id, id), isNull(Identities.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findAll() {
    return this.db
      .select()
      .from(Identities)
      .where(isNull(Identities.deletedAt))
      .orderBy(desc(Identities.createdAt));
  }
}
