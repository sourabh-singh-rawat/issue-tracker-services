import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, ne, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type PlatformRole,
  PlatformRoles,
  Roles,
} from "@/db";
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
    const id = uuidv7();

    const [created] = await client
      .insert(Roles)
      .values({
        id,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isSystem: entity.isSystem ?? false,
        createdAt: now,
        version: 1,
      })
      .returning();

    await client.insert(PlatformRoles).values({
      id: uuidv7(),
      roleId: created.id,
    });

    return created;
  }

  async update(
    id: string,
    entity: UpdatePlatformRoleEntity,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<PlatformRole | null> {
    const client = this.client(options);
    const now = new Date();

    const existing = await this.findById(id, options);
    if (!existing) {
      return null;
    }

    const [updated] = await client
      .update(Roles)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        updatedAt: now,
        version: sql`${Roles.version} + 1`,
      })
      .where(and(eq(Roles.id, id), isNull(Roles.deletedAt)))
      .returning();

    return updated ?? null;
  }

  async findById(
    id: string,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<PlatformRole | null> {
    const client = this.client(options);
    const [row] = await client
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
      })
      .from(Roles)
      .innerJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
      .where(and(eq(Roles.id, id), isNull(Roles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByKey(key: string): Promise<PlatformRole | null> {
    const [row] = await this.db
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
      })
      .from(Roles)
      .innerJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
      .where(and(eq(Roles.key, key), isNull(Roles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async existsByKey(key: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? and(eq(Roles.key, key), isNull(Roles.deletedAt))
        : and(eq(Roles.key, key), isNull(Roles.deletedAt), ne(Roles.id, excludeId));

    const row = await this.db
      .select({ id: Roles.id })
      .from(Roles)
      .innerJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
      .where(condition)
      .limit(1);

    return row.length > 0;
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? and(eq(Roles.name, name), isNull(Roles.deletedAt))
        : and(eq(Roles.name, name), isNull(Roles.deletedAt), ne(Roles.id, excludeId));

    const row = await this.db
      .select({ id: Roles.id })
      .from(Roles)
      .innerJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
      .where(condition)
      .limit(1);

    return row.length > 0;
  }

  async findAll(): Promise<PlatformRole[]> {
    return this.db
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
      })
      .from(Roles)
      .innerJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
      .where(isNull(Roles.deletedAt))
      .orderBy(desc(Roles.createdAt));
  }

  async softDelete(
    id: string,
    options?: PlatformRoleRepositoryOptions,
  ): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const existing = await this.findById(id, options);
    if (!existing) {
      return false;
    }

    const deleted = await client
      .update(Roles)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${Roles.version} + 1`,
      })
      .where(and(eq(Roles.id, id), isNull(Roles.deletedAt)))
      .returning({ id: Roles.id });

    return deleted.length > 0;
  }

  private client(options?: PlatformRoleRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
