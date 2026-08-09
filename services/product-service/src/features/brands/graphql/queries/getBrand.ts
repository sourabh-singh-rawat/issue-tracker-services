import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { BrandObject } from "@/features/brands/graphql/objects/BrandObject";
import type { IBrandService } from "@/features/brands/services";

builder.queryFields((t) => ({
  getBrand: t.field({
    type: BrandObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IBrandService>(TYPES.BrandService);
      return service.getBrandById(id);
    },
  }),
}));
