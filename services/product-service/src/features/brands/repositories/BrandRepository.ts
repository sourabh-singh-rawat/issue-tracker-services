import { uuidv7 } from "@pine/common";
import { and, desc, eq, ne } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Brand, Brands, type Database } from "@/db";
import type {
  BrandRepositoryOptions,
  CreateBrandEntity,
  IBrandRepository,
  UpdateBrandEntity,
} from "@/features/brands/repositories/IBrandRepository";

@injectable()
export class BrandRepository implements IBrandRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: BrandRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateBrandEntity, options?: BrandRepositoryOptions): Promise<Brand> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Brands)
      .values({
        id: uuidv7(),
        code: entity.code,
        name: entity.name,
        description: entity.description ?? null,
        isActive: entity.isActive ?? true,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateBrandEntity,
    options?: BrandRepositoryOptions,
  ): Promise<Brand> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Brands)
      .set({
        ...(entity.code !== undefined ? { code: entity.code } : {}),
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.isActive !== undefined ? { isActive: entity.isActive } : {}),
        updatedAt: now,
      })
      .where(eq(Brands.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Brand not found for update: ${id}`);
    }

    return updated;
  }

  async delete(id: string, options?: BrandRepositoryOptions): Promise<boolean> {
    const client = this.client(options);
    const deleted = await client.delete(Brands).where(eq(Brands.id, id)).returning({
      id: Brands.id,
    });

    return deleted.length > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Brands.id })
      .from(Brands)
      .where(eq(Brands.id, id))
      .limit(1);

    return row.length > 0;
  }

  async existsByCode(code: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? eq(Brands.code, code)
        : and(eq(Brands.code, code), ne(Brands.id, excludeId));

    const row = await this.db.select({ id: Brands.id }).from(Brands).where(condition).limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Brand | null> {
    const [row] = await this.db.select().from(Brands).where(eq(Brands.id, id)).limit(1);

    return row ?? null;
  }

  async findByCode(code: string): Promise<Brand | null> {
    const [row] = await this.db.select().from(Brands).where(eq(Brands.code, code)).limit(1);

    return row ?? null;
  }

  async findAll(): Promise<Brand[]> {
    return this.db.select().from(Brands).orderBy(desc(Brands.createdAt));
  }
}
