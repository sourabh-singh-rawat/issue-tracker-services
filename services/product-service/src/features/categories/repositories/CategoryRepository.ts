import { uuidv7 } from "@pine/common";
import { and, desc, eq, ne } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Category, Categories, type Database } from "@/db";
import type {
  CategoryRepositoryOptions,
  CreateCategoryEntity,
  ICategoryRepository,
  UpdateCategoryEntity,
} from "@/features/categories/repositories/ICategoryRepository";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: CategoryRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateCategoryEntity, options?: CategoryRepositoryOptions): Promise<Category> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Categories)
      .values({
        id: uuidv7(),
        code: entity.code,
        name: entity.name,
        description: entity.description ?? null,
        parentCategoryId: entity.parentCategoryId ?? null,
        isActive: entity.isActive ?? true,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateCategoryEntity,
    options?: CategoryRepositoryOptions,
  ): Promise<Category> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Categories)
      .set({
        ...(entity.code !== undefined ? { code: entity.code } : {}),
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.parentCategoryId !== undefined
          ? { parentCategoryId: entity.parentCategoryId }
          : {}),
        ...(entity.isActive !== undefined ? { isActive: entity.isActive } : {}),
        updatedAt: now,
      })
      .where(eq(Categories.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Category not found for update: ${id}`);
    }

    return updated;
  }

  async delete(id: string, options?: CategoryRepositoryOptions): Promise<boolean> {
    const client = this.client(options);
    const deleted = await client.delete(Categories).where(eq(Categories.id, id)).returning({
      id: Categories.id,
    });

    return deleted.length > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Categories.id })
      .from(Categories)
      .where(eq(Categories.id, id))
      .limit(1);

    return row.length > 0;
  }

  async existsByCode(code: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? eq(Categories.code, code)
        : and(eq(Categories.code, code), ne(Categories.id, excludeId));

    const row = await this.db
      .select({ id: Categories.id })
      .from(Categories)
      .where(condition)
      .limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Category | null> {
    const [row] = await this.db.select().from(Categories).where(eq(Categories.id, id)).limit(1);

    return row ?? null;
  }

  async findByCode(code: string): Promise<Category | null> {
    const [row] = await this.db.select().from(Categories).where(eq(Categories.code, code)).limit(1);

    return row ?? null;
  }

  async findAll(): Promise<Category[]> {
    return this.db.select().from(Categories).orderBy(desc(Categories.createdAt));
  }
}
