import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateBrandInput } from "@/features/brands/graphql/inputs/UpdateBrandInput";
import { BrandObject } from "@/features/brands/graphql/objects/BrandObject";
import type { IBrandService } from "@/features/brands/services";

builder.mutationFields((t) => ({
  updateBrand: t.field({
    type: BrandObject,
    args: {
      input: t.arg({ type: UpdateBrandInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IBrandService>(TYPES.BrandService);

      return service.updateBrand(input.brandId, {
        code: input.code ?? undefined,
        name: input.name ?? undefined,
        description: input.description ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
