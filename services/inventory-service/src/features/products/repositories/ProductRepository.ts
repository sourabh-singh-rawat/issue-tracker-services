import { and, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Product, Products } from "@/db";
import type {
  CreateProductEntity,
  IProductRepository,
  ProductRepositoryOptions,
} from "@/features/products/repositories/IProductRepository";

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ProductRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateProductEntity, options?: ProductRepositoryOptions): Promise<Product> {
    const client = this.client(options);
    const now = entity.createdAt ?? new Date();

    const [created] = await client
      .insert(Products)
      .values({
        id: entity.id,
        code: entity.code,
        sku: entity.sku,
        name: entity.name,
        productType: entity.productType,
        description: entity.description ?? null,
        categoryId: entity.categoryId ?? null,
        brandId: entity.brandId ?? null,
        defaultUnitId: entity.defaultUnitId,
        isActive: entity.isActive ?? true,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Products.id })
      .from(Products)
      .where(and(eq(Products.id, id), isNull(Products.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Product | null> {
    const [row] = await this.db
      .select()
      .from(Products)
      .where(and(eq(Products.id, id), isNull(Products.deletedAt)))
      .limit(1);

    return row ?? null;
  }
}
