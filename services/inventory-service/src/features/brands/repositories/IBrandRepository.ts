import type { Brand, DbClient } from "@/db";

export type BrandRepositoryOptions = { tx: DbClient };

export type CreateBrandEntity = {
  id: string;
  code: string;
  name: string;
  isActive?: boolean;
  description?: string | null;
  createdAt?: Date;
  version?: number;
};

export type UpdateBrandEntity = {
  code: string;
  name: string;
  isActive: boolean;
  description?: string | null;
  updatedAt?: Date;
  version: number;
};

export interface IBrandRepository {
  save(entity: CreateBrandEntity, options?: BrandRepositoryOptions): Promise<Brand>;
  update(id: string, entity: UpdateBrandEntity, options?: BrandRepositoryOptions): Promise<Brand>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<Brand | null>;
}
