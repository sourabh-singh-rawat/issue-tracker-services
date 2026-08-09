import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { ProductObject } from "@/features/products/graphql/objects/ProductObject";
import type { IProductService } from "@/features/products/services";

builder.queryFields((t) => ({
  getProduct: t.field({
    type: ProductObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IProductService>(TYPES.ProductService);
      return service.getProductById(id);
    },
  }),
}));
