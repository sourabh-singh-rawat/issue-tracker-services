import type { Category, DbClient } from "@/db";

export type CategoryRepositoryOptions = { tx: DbClient };

export type CreateCategoryEntity = {
  code: string;
  name: string;
  description?: string | null;
  parentCategoryId?: string | null;
  isActive?: boolean;
};

export type UpdateCategoryEntity = Partial<
  Pick<Category, "code" | "name" | "description" | "parentCategoryId" | "isActive">
>;

export interface ICategoryRepository {
  save(entity: CreateCategoryEntity, options?: CategoryRepositoryOptions): Promise<Category>;
  update(
    id: string,
    entity: UpdateCategoryEntity,
    options?: CategoryRepositoryOptions,
  ): Promise<Category>;
  delete(id: string, options?: CategoryRepositoryOptions): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  existsByCode(code: string, excludeId?: string): Promise<boolean>;
  findById(id: string): Promise<Category | null>;
  findByCode(code: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}
