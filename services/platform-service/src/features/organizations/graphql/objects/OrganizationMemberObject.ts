import { builder } from "@pine/server";
import type { OrganizationMember } from "@/features/organizations/services/IOrganizationMemberService";

export const OrganizationMemberObject = builder.objectRef<OrganizationMember>(
  "OrganizationMemberObject",
);

OrganizationMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    organizationId: t.exposeString("organizationId"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
