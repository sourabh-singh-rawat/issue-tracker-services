import { uuidv7 } from "@pine/common";
import { and, desc, eq, inArray } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, Resources } from "@/db";
import type {
  CreatePermissionEntity,
  IPermissionRepository,
  Permission,
  PermissionRepositoryOptions,
  UpdatePermissionEntity,
} from "@/features/permissions/repositories/IPermissionRepository";

const CAPABILITY_TYPE = "capability";

@injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: PermissionRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreatePermissionEntity,
    options?: PermissionRepositoryOptions,
  ): Promise<Permission> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Resources)
      .values({
        id: uuidv7(),
        type: CAPABILITY_TYPE,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isStatic: false,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    key: string,
    entity: UpdatePermissionEntity,
    options?: PermissionRepositoryOptions,
  ): Promise<Permission> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Resources)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        updatedAt: now,
      })
      .where(and(eq(Resources.key, key), eq(Resources.type, CAPABILITY_TYPE)))
      .returning();

    if (!updated) {
      throw new Error(`Permission not found for update: ${key}`);
    }

    return updated;
  }

  async existsByKey(key: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Resources.id })
      .from(Resources)
      .where(and(eq(Resources.key, key), eq(Resources.type, CAPABILITY_TYPE)))
      .limit(1);

    return row.length > 0;
  }

  async findByKey(key: string): Promise<Permission | null> {
    const [row] = await this.db
      .select()
      .from(Resources)
      .where(and(eq(Resources.key, key), eq(Resources.type, CAPABILITY_TYPE)))
      .limit(1);

    return row ?? null;
  }

  async findByKeys(keys: string[]): Promise<Permission[]> {
    if (keys.length === 0) {
      return [];
    }

    return this.db
      .select()
      .from(Resources)
      .where(and(inArray(Resources.key, keys), eq(Resources.type, CAPABILITY_TYPE)));
  }

  async findAll(): Promise<Permission[]> {
    return this.db
      .select()
      .from(Resources)
      .where(eq(Resources.type, CAPABILITY_TYPE))
      .orderBy(desc(Resources.createdAt));
  }
}
