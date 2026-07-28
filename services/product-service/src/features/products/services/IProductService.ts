import type { Product } from "@/db";
import type { ProductType } from "@/constants";

export type CreateProductInput = {
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

export interface IProductService {
  createProduct(input: CreateProductInput): Promise<Product>;
  getProductById(id: string): Promise<Product>;
}
