import { builder } from "@pine/server";
import type { PlatformRelation } from "@/features/platform/services/IPlatformRelationService";

export const PlatformRelationObject = builder.objectRef<PlatformRelation>("PlatformRelationObject");

PlatformRelationObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
