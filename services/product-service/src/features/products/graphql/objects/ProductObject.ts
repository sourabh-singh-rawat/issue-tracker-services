import { builder } from "@pine/graphql-core";
import type { Product } from "@/db";

export const ProductObject = builder.objectRef<Product>("ProductObject");

ProductObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    code: t.exposeString("code"),
    sku: t.exposeString("sku"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    productType: t.exposeString("productType"),
    categoryId: t.exposeString("categoryId", { nullable: true }),
    brandId: t.exposeString("brandId", { nullable: true }),
    defaultUnitId: t.exposeString("defaultUnitId"),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
