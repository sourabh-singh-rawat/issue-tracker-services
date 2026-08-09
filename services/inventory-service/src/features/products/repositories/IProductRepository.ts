import type { DbClient, Product } from "@/db";

export type ProductRepositoryOptions = { tx: DbClient };

export type CreateProductEntity = {
  id: string;
  code: string;
  sku: string;
  name: string;
  productType: string;
  defaultUnitId: string;
  isActive?: boolean;
  description?: string | null;
  categoryId?: string | null;
  brandId?: string | null;
  createdAt?: Date;
};

export interface IProductRepository {
  save(entity: CreateProductEntity, options?: ProductRepositoryOptions): Promise<Product>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<Product | null>;
}
