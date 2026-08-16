import { builder } from "@pine/server";
import type { TenantMember } from "@/features/tenants/services/ITenantMemberService";

export const TenantMemberObject = builder.objectRef<TenantMember>("TenantMemberObject");

TenantMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
