import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IBrandService } from "@/features/brands/services";

builder.mutationFields((t) => ({
  deleteBrand: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IBrandService>(TYPES.BrandService);
      await service.deleteBrand(id);
      return "Brand deleted successfully.";
    },
  }),
}));
