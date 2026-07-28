import type { ProductUnit, DbClient } from "@/db";

export type ProductUnitRepositoryOptions = { tx: DbClient };

export type CreateProductUnitEntity = {
  productId: string;
  unitId: string;
  baseUnitMultiplier: string;
  isBaseUnit?: boolean;
  isActive?: boolean;
};

export interface IProductUnitRepository {
  save(
    entity: CreateProductUnitEntity,
    options?: ProductUnitRepositoryOptions,
  ): Promise<ProductUnit>;
}
