import { builder } from "@pine/server";
import type { Brand } from "@/db";

export const BrandObject = builder.objectRef<Brand>("BrandObject");

BrandObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    code: t.exposeString("code"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
