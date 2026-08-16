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

  save = async (
    entity: CreateIdentityEntity,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity> => {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Identities)
      .values({
        id: entity.id,
        displayName: entity.displayName ?? null,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  };

  update = async (
    id: string,
    entity: Partial<Pick<Identity, "displayName" | "deletedAt">>,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity> => {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Identities)
      .set({
        ...(entity.displayName !== undefined ? { displayName: entity.displayName } : {}),
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
  };

  existsById = async (id: string, options?: IdentityRepositoryOptions): Promise<boolean> => {
    const identity = await this.findById(id, options);
    return identity != null;
  };

  findById = async (
    id: string,
    options?: IdentityRepositoryOptions,
  ): Promise<Identity | null> => {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(Identities)
      .where(and(eq(Identities.id, id), isNull(Identities.deletedAt)))
      .limit(1);

    return row ?? null;
  };

  findAll = async (): Promise<Identity[]> => {
    return this.db
      .select()
      .from(Identities)
      .where(isNull(Identities.deletedAt))
      .orderBy(desc(Identities.createdAt));
  };

  private client = (options?: IdentityRepositoryOptions) => options?.tx ?? this.db;
}
