import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { BrandObject } from "@/features/brands/graphql/objects/BrandObject";
import type { IBrandService } from "@/features/brands/services";

builder.queryFields((t) => ({
  findBrands: t.field({
    type: [BrandObject],
    resolve: async () => {
      const service = container.get<IBrandService>(TYPES.BrandService);
      return service.listBrands();
    },
  }),
}));
