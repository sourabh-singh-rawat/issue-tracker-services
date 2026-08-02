import { uuidv7 } from "@pine/common";
import { desc, eq, inArray } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Resource, Resources } from "@/db";
import type {
  CreateResourceEntity,
  IResourceRepository,
  ResourceRepositoryOptions,
  UpdateResourceEntity,
} from "@/features/resources/repositories/IResourceRepository";

@injectable()
export class ResourceRepository implements IResourceRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ResourceRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Resources)
      .values({
        id: uuidv7(),
        type: entity.type,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isStatic: entity.isStatic ?? false,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Resources)
      .set({
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.isStatic !== undefined ? { isStatic: entity.isStatic } : {}),
        updatedAt: now,
      })
      .where(eq(Resources.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Resource not found for update: ${id}`);
    }

    return updated;
  }

  async existsByKey(key: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Resources.id })
      .from(Resources)
      .where(eq(Resources.key, key))
      .limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Resource | null> {
    const [row] = await this.db
      .select()
      .from(Resources)
      .where(eq(Resources.id, id))
      .limit(1);

    return row ?? null;
  }

  async findByKey(key: string): Promise<Resource | null> {
    const [row] = await this.db
      .select()
      .from(Resources)
      .where(eq(Resources.key, key))
      .limit(1);

    return row ?? null;
  }

  async findByKeys(keys: string[]): Promise<Resource[]> {
    if (keys.length === 0) {
      return [];
    }

    return this.db.select().from(Resources).where(inArray(Resources.key, keys));
  }

  async findByType(type: string): Promise<Resource[]> {
    return this.db
      .select()
      .from(Resources)
      .where(eq(Resources.type, type))
      .orderBy(desc(Resources.createdAt));
  }

  async findAll(): Promise<Resource[]> {
    return this.db.select().from(Resources).orderBy(desc(Resources.createdAt));
  }

  async upsertByKey(
    entity: CreateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource> {
    const client = this.client(options);
    const now = new Date();

    const [row] = await client
      .insert(Resources)
      .values({
        id: uuidv7(),
        type: entity.type,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isStatic: entity.isStatic ?? false,
        createdAt: now,
      })
      .onConflictDoUpdate({
        target: Resources.key,
        set: {
          type: entity.type,
          name: entity.name,
          description: entity.description ?? null,
          isStatic: entity.isStatic ?? false,
          updatedAt: now,
        },
      })
      .returning();

    return row;
  }
}
