import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { CreateBrandInput } from "@/features/brands/graphql/inputs/CreateBrandInput";
import { BrandObject } from "@/features/brands/graphql/objects/BrandObject";
import type { IBrandService } from "@/features/brands/services";

builder.mutationFields((t) => ({
  createBrand: t.field({
    type: BrandObject,
    args: {
      input: t.arg({ type: CreateBrandInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IBrandService>(TYPES.BrandService);

      return service.createBrand({
        code: input.code,
        name: input.name,
        description: input.description ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
