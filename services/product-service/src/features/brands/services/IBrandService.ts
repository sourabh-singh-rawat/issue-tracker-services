import type { Brand } from "@/db";

export type CreateBrandInput = {
  code: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export type UpdateBrandInput = {
  code?: string;
  name?: string;
  description?: string | null;
  isActive?: boolean;
};

export interface IBrandService {
  createBrand(input: CreateBrandInput): Promise<Brand>;
  getBrandById(id: string): Promise<Brand>;
  listBrands(): Promise<Brand[]>;
  updateBrand(id: string, input: UpdateBrandInput): Promise<Brand>;
  deleteBrand(id: string): Promise<void>;
}
