import { builder } from "@pine/server";
import type { PlatformMember } from "@/features/platform/services/IPlatformMemberService";

export const PlatformMemberObject = builder.objectRef<PlatformMember>("PlatformMemberObject");

PlatformMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    identityId: t.exposeString("identityId"),
    relation: t.exposeString("relation"),
  }),
});
