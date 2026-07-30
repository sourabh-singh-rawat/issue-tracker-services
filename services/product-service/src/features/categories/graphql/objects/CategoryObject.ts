import { builder } from "@pine/graphql-core";
import type { Category } from "@/db";

export const CategoryObject = builder.objectRef<Category>("CategoryObject");

CategoryObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    code: t.exposeString("code"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    parentCategoryId: t.exposeString("parentCategoryId", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
