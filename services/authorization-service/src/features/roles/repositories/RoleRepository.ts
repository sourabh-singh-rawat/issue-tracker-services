import { uuidv7 } from "@pine/common";
import { and, desc, eq, ne } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Role, Roles } from "@/db";
import type {
  CreateRoleEntity,
  IRoleRepository,
  RoleRepositoryOptions,
  UpdateRoleEntity,
} from "@/features/roles/repositories/IRoleRepository";

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: RoleRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateRoleEntity, options?: RoleRepositoryOptions): Promise<Role> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Roles)
      .values({
        id: entity.id ?? uuidv7(),
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateRoleEntity,
    options?: RoleRepositoryOptions,
  ): Promise<Role> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Roles)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        updatedAt: now,
      })
      .where(eq(Roles.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Role not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Roles.id })
      .from(Roles)
      .where(eq(Roles.id, id))
      .limit(1);

    return row.length > 0;
  }

  async existsByKey(key: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Roles.id })
      .from(Roles)
      .where(eq(Roles.key, key))
      .limit(1);

    return row.length > 0;
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? eq(Roles.name, name)
        : and(eq(Roles.name, name), ne(Roles.id, excludeId));

    const row = await this.db.select({ id: Roles.id }).from(Roles).where(condition).limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Role | null> {
    const [row] = await this.db.select().from(Roles).where(eq(Roles.id, id)).limit(1);

    return row ?? null;
  }

  async findByKey(key: string): Promise<Role | null> {
    const [row] = await this.db.select().from(Roles).where(eq(Roles.key, key)).limit(1);

    return row ?? null;
  }

  async findByName(name: string): Promise<Role | null> {
    const [row] = await this.db.select().from(Roles).where(eq(Roles.name, name)).limit(1);

    return row ?? null;
  }

  async findAll(): Promise<Role[]> {
    return this.db.select().from(Roles).orderBy(desc(Roles.createdAt));
  }

  async upsertById(
    entity: CreateRoleEntity & { id: string },
    options?: RoleRepositoryOptions,
  ): Promise<Role> {
    const client = this.client(options);
    const now = new Date();

    const [row] = await client
      .insert(Roles)
      .values({
        id: entity.id,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        createdAt: now,
      })
      .onConflictDoUpdate({
        target: Roles.id,
        set: {
          key: entity.key,
          name: entity.name,
          description: entity.description ?? null,
          updatedAt: now,
        },
      })
      .returning();

    return row;
  }
}
