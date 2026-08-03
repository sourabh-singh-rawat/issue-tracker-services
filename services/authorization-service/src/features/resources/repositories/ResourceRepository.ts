import { uuidv7 } from "@pine/common";
import { and, desc, eq, ne } from "drizzle-orm";
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
        name: entity.name,
        description: entity.description ?? null,
        isSystem: entity.isSystem ?? false,
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
        ...(entity.isSystem !== undefined ? { isSystem: entity.isSystem } : {}),
        updatedAt: now,
      })
      .where(eq(Resources.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Resource not found for update: ${id}`);
    }

    return updated;
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Resources.id })
      .from(Resources)
      .where(
        excludeId
          ? and(eq(Resources.name, name), ne(Resources.id, excludeId))
          : eq(Resources.name, name),
      )
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

  async findByName(name: string): Promise<Resource | null> {
    const [row] = await this.db
      .select()
      .from(Resources)
      .where(eq(Resources.name, name))
      .limit(1);

    return row ?? null;
  }

  async findAll(): Promise<Resource[]> {
    return this.db.select().from(Resources).orderBy(desc(Resources.createdAt));
  }

  async upsertByName(
    entity: CreateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource> {
    const client = this.client(options);
    const now = new Date();

    const [row] = await client
      .insert(Resources)
      .values({
        id: uuidv7(),
        name: entity.name,
        description: entity.description ?? null,
        isSystem: entity.isSystem ?? false,
        createdAt: now,
      })
      .onConflictDoUpdate({
        target: Resources.name,
        set: {
          description: entity.description ?? null,
          isSystem: entity.isSystem ?? false,
          updatedAt: now,
        },
      })
      .returning();

    return row;
  }
}
