import { builder } from "@pine/server";
import type { Organization } from "@/db";

export const OrganizationObject = builder.objectRef<Organization>("OrganizationObject");

OrganizationObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    parentOrganizationId: t.exposeString("parentOrganizationId", { nullable: true }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    description: t.exposeString("description", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
