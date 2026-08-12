import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, ne, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type PlatformRole, PlatformRoles } from "@/db";
import type {
  CreatePlatformRoleEntity,
  IPlatformRoleRepository,
  PlatformRoleRepositoryOptions,
  UpdatePlatformRoleEntity,
} from "@/features/platformRoles/repositories/IPlatformRoleRepository";

@injectable()
export class PlatformRoleRepository implements IPlatformRoleRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreatePlatformRoleEntity,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<PlatformRole> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(PlatformRoles)
      .values({
        id: uuidv7(),
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isSystem: entity.isSystem ?? false,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdatePlatformRoleEntity,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<PlatformRole | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(PlatformRoles)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        updatedAt: now,
        version: sql`${PlatformRoles.version} + 1`,
      })
      .where(and(eq(PlatformRoles.id, id), isNull(PlatformRoles.deletedAt)))
      .returning();

    return updated ?? null;
  }

  async findById(id: string): Promise<PlatformRole | null> {
    const [row] = await this.db
      .select()
      .from(PlatformRoles)
      .where(and(eq(PlatformRoles.id, id), isNull(PlatformRoles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByKey(key: string): Promise<PlatformRole | null> {
    const [row] = await this.db
      .select()
      .from(PlatformRoles)
      .where(and(eq(PlatformRoles.key, key), isNull(PlatformRoles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async existsByKey(key: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? and(eq(PlatformRoles.key, key), isNull(PlatformRoles.deletedAt))
        : and(
            eq(PlatformRoles.key, key),
            isNull(PlatformRoles.deletedAt),
            ne(PlatformRoles.id, excludeId),
          );

    const row = await this.db
      .select({ id: PlatformRoles.id })
      .from(PlatformRoles)
      .where(condition)
      .limit(1);

    return row.length > 0;
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? and(eq(PlatformRoles.name, name), isNull(PlatformRoles.deletedAt))
        : and(
            eq(PlatformRoles.name, name),
            isNull(PlatformRoles.deletedAt),
            ne(PlatformRoles.id, excludeId),
          );

    const row = await this.db
      .select({ id: PlatformRoles.id })
      .from(PlatformRoles)
      .where(condition)
      .limit(1);

    return row.length > 0;
  }

  async findAll(): Promise<PlatformRole[]> {
    return this.db
      .select()
      .from(PlatformRoles)
      .where(isNull(PlatformRoles.deletedAt))
      .orderBy(desc(PlatformRoles.createdAt));
  }

  async softDelete(
    id: string,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const deleted = await client
      .update(PlatformRoles)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${PlatformRoles.version} + 1`,
      })
      .where(and(eq(PlatformRoles.id, id), isNull(PlatformRoles.deletedAt)))
      .returning({ id: PlatformRoles.id });

    return deleted.length > 0;
  }

  private client(options?: PlatformRoleRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
