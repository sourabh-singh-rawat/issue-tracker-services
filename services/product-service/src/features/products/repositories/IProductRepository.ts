import type { Product, DbClient } from "@/db";
import type { ProductType } from "@/constants";

export type ProductRepositoryOptions = { tx: DbClient };

export type CreateProductEntity = {
  code: string;
  sku: string;
  name: string;
  productType: ProductType;
  description?: string | null;
  categoryId?: string | null;
  brandId?: string | null;
  defaultUnitId: string;
  isActive?: boolean;
};

export interface IProductRepository {
  save(entity: CreateProductEntity, options?: ProductRepositoryOptions): Promise<Product>;
  existsByCode(code: string): Promise<boolean>;
  existsBySku(sku: string): Promise<boolean>;
  findById(id: string): Promise<Product | null>;
}
