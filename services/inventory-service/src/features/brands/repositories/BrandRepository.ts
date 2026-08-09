import { eq } from "drizzle-orm";
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
    const now = entity.createdAt ?? new Date();

    const [created] = await client
      .insert(Brands)
      .values({
        id: entity.id,
        code: entity.code,
        name: entity.name,
        description: entity.description ?? null,
        isActive: entity.isActive ?? true,
        createdAt: now,
        version: entity.version ?? 1,
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
    const now = entity.updatedAt ?? new Date();

    const [updated] = await client
      .update(Brands)
      .set({
        code: entity.code,
        name: entity.name,
        description: entity.description ?? null,
        isActive: entity.isActive,
        updatedAt: now,
        version: entity.version,
      })
      .where(eq(Brands.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Brand not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Brands.id })
      .from(Brands)
      .where(eq(Brands.id, id))
      .limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Brand | null> {
    const [row] = await this.db.select().from(Brands).where(eq(Brands.id, id)).limit(1);

    return row ?? null;
  }
}
