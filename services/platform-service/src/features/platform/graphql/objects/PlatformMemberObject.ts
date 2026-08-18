import { builder } from "@pine/server";
import type { PlatformRelation } from "@/features/platform/services/IPlatformRelationService";

export const PlatformMemberObject = builder.objectRef<PlatformRelation>("PlatformMemberObject");

PlatformMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
