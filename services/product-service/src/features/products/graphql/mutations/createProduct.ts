import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { ProductType } from "@/constants";
import { CreateProductInput } from "@/features/products/graphql/inputs/CreateProductInput";
import { ProductObject } from "@/features/products/graphql/objects/ProductObject";
import type { IProductService } from "@/features/products/services";

builder.mutationFields((t) => ({
  createProduct: t.field({
    type: ProductObject,
    args: {
      input: t.arg({ type: CreateProductInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IProductService>(TYPES.ProductService);

      return service.createProduct({
        code: input.code,
        sku: input.sku,
        name: input.name,
        productType: input.productType as ProductType,
        description: input.description ?? undefined,
        categoryId: input.categoryId ?? undefined,
        brandId: input.brandId ?? undefined,
        defaultUnitId: input.defaultUnitId,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
