import type { Category } from "@/db";

export type CreateCategoryInput = {
  code: string;
  name: string;
  description?: string | null;
  parentCategoryId?: string | null;
  isActive?: boolean;
};

export type UpdateCategoryInput = {
  code?: string;
  name?: string;
  description?: string | null;
  parentCategoryId?: string | null;
  isActive?: boolean;
};

export interface ICategoryService {
  createCategory(input: CreateCategoryInput): Promise<Category>;
  getCategoryById(id: string): Promise<Category>;
  listCategories(): Promise<Category[]>;
  updateCategory(id: string, input: UpdateCategoryInput): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
}
