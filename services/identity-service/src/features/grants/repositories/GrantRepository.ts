import { uuidv7 } from "@pine/common";
import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Grant, Grants } from "@/db";
import {
  type GrantRepositoryOptions,
  type IGrantRepository,
} from "@/features/grants/repositories/IGrantRepository";

@injectable()
export class GrantRepository implements IGrantRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: GrantRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<Grant> & { name: string },
    options?: GrantRepositoryOptions,
  ): Promise<Grant> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Grants)
      .values({
        id: uuidv7(),
        name: entity.name,
        description: entity.description ?? null,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async findById(id: string): Promise<Grant | null> {
    const [row] = await this.db
      .select()
      .from(Grants)
      .where(and(eq(Grants.id, id), isNull(Grants.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByIds(ids: string[]): Promise<Grant[]> {
    if (ids.length === 0) return [];

    return this.db
      .select()
      .from(Grants)
      .where(and(inArray(Grants.id, ids), isNull(Grants.deletedAt)));
  }

  async findByName(name: string): Promise<Grant | null> {
    const [row] = await this.db
      .select()
      .from(Grants)
      .where(and(eq(Grants.name, name), isNull(Grants.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByNames(names: string[]): Promise<Grant[]> {
    if (names.length === 0) return [];

    return this.db
      .select()
      .from(Grants)
      .where(and(inArray(Grants.name, names), isNull(Grants.deletedAt)));
  }

  async findAll(): Promise<Grant[]> {
    return this.db
      .select()
      .from(Grants)
      .where(isNull(Grants.deletedAt))
      .orderBy(desc(Grants.createdAt));
  }

  async softDelete(id: string, options?: GrantRepositoryOptions): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(Grants)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${Grants.version} + 1`,
      })
      .where(and(eq(Grants.id, id), isNull(Grants.deletedAt)));
  }
}
