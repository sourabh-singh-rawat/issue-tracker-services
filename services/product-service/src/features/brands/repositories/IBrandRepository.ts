import type { Brand, DbClient } from "@/db";

export type BrandRepositoryOptions = { tx: DbClient };

export type CreateBrandEntity = {
  code: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export type UpdateBrandEntity = Partial<
  Pick<Brand, "code" | "name" | "description" | "isActive">
>;

export interface IBrandRepository {
  save(entity: CreateBrandEntity, options?: BrandRepositoryOptions): Promise<Brand>;
  update(
    id: string,
    entity: UpdateBrandEntity,
    options?: BrandRepositoryOptions,
  ): Promise<Brand>;
  delete(id: string, options?: BrandRepositoryOptions): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  existsByCode(code: string, excludeId?: string): Promise<boolean>;
  findById(id: string): Promise<Brand | null>;
  findByCode(code: string): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
}
