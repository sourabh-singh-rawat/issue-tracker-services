import { eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type ProductUnit, ProductUnits } from "@/db";
import type {
  CreateProductUnitEntity,
  IProductUnitRepository,
  ProductUnitRepositoryOptions,
} from "@/features/products/repositories/IProductUnitRepository";

@injectable()
export class ProductUnitRepository implements IProductUnitRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ProductUnitRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateProductUnitEntity,
    options?: ProductUnitRepositoryOptions,
  ): Promise<ProductUnit> {
    const client = this.client(options);
    const now = entity.createdAt ?? new Date();

    const [created] = await client
      .insert(ProductUnits)
      .values({
        id: entity.id,
        productId: entity.productId,
        unitId: entity.unitId,
        baseUnitMultiplier: entity.baseUnitMultiplier,
        isBaseUnit: entity.isBaseUnit ?? false,
        isActive: entity.isActive ?? true,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db
      .select({ id: ProductUnits.id })
      .from(ProductUnits)
      .where(eq(ProductUnits.id, id))
      .limit(1);

    return row.length > 0;
  }
}
