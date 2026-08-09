import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateCategoryInput } from "@/features/categories/graphql/inputs/CreateCategoryInput";
import { CategoryObject } from "@/features/categories/graphql/objects/CategoryObject";
import type { ICategoryService } from "@/features/categories/services";

builder.mutationFields((t) => ({
  createCategory: t.field({
    type: CategoryObject,
    args: {
      input: t.arg({ type: CreateCategoryInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<ICategoryService>(TYPES.CategoryService);

      return service.createCategory({
        code: input.code,
        name: input.name,
        description: input.description ?? undefined,
        parentCategoryId: input.parentCategoryId ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
