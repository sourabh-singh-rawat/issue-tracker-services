import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateCategoryInput } from "@/features/categories/graphql/inputs/UpdateCategoryInput";
import { CategoryObject } from "@/features/categories/graphql/objects/CategoryObject";
import type { ICategoryService } from "@/features/categories/services";

builder.mutationFields((t) => ({
  updateCategory: t.field({
    type: CategoryObject,
    args: {
      input: t.arg({ type: UpdateCategoryInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<ICategoryService>(TYPES.CategoryService);

      return service.updateCategory(input.categoryId, {
        code: input.code ?? undefined,
        name: input.name ?? undefined,
        description: input.description ?? undefined,
        parentCategoryId: input.parentCategoryId ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
