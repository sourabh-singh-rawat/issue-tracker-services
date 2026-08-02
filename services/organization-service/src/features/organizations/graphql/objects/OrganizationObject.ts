import { builder } from "@pine/graphql-core";
import type { Organization } from "@/db";

export const OrganizationObject = builder.objectRef<Organization>("OrganizationObject");

OrganizationObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    description: t.exposeString("description", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
