import { uuidv7 } from "@pine/common";
import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Scope, Scopes } from "@/db";
import {
  type IScopeRepository,
  type ScopeRepositoryOptions,
} from "@/features/scopes/repositories/IScopeRepository";

@injectable()
export class ScopeRepository implements IScopeRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ScopeRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<Scope> & { name: string },
    options?: ScopeRepositoryOptions,
  ): Promise<Scope> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Scopes)
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

  async findById(id: string): Promise<Scope | null> {
    const [row] = await this.db
      .select()
      .from(Scopes)
      .where(and(eq(Scopes.id, id), isNull(Scopes.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByIds(ids: string[]): Promise<Scope[]> {
    if (ids.length === 0) return [];

    return this.db
      .select()
      .from(Scopes)
      .where(and(inArray(Scopes.id, ids), isNull(Scopes.deletedAt)));
  }

  async findByName(name: string): Promise<Scope | null> {
    const [row] = await this.db
      .select()
      .from(Scopes)
      .where(and(eq(Scopes.name, name), isNull(Scopes.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByNames(names: string[]): Promise<Scope[]> {
    if (names.length === 0) return [];

    return this.db
      .select()
      .from(Scopes)
      .where(and(inArray(Scopes.name, names), isNull(Scopes.deletedAt)));
  }

  async findAll(): Promise<Scope[]> {
    return this.db
      .select()
      .from(Scopes)
      .where(isNull(Scopes.deletedAt))
      .orderBy(desc(Scopes.createdAt));
  }

  async softDelete(id: string, options?: ScopeRepositoryOptions): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(Scopes)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${Scopes.version} + 1`,
      })
      .where(and(eq(Scopes.id, id), isNull(Scopes.deletedAt)));
  }
}
