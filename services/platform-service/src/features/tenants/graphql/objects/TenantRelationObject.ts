import { builder } from "@pine/server";
import type { TenantRelation } from "@/features/tenants/services/ITenantRelationService";

export const TenantRelationObject = builder.objectRef<TenantRelation>("TenantRelationObject");

TenantRelationObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
