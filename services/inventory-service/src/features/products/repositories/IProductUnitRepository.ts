import type { DbClient, ProductUnit } from "@/db";

export type ProductUnitRepositoryOptions = { tx: DbClient };

export type CreateProductUnitEntity = {
  id: string;
  productId: string;
  unitId: string;
  baseUnitMultiplier: string;
  isBaseUnit?: boolean;
  isActive?: boolean;
  createdAt?: Date;
};

export interface IProductUnitRepository {
  save(
    entity: CreateProductUnitEntity,
    options?: ProductUnitRepositoryOptions,
  ): Promise<ProductUnit>;
  existsById(id: string): Promise<boolean>;
}
