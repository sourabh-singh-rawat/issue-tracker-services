import { builder } from "@pine/server";
import type { PublicIdentity } from "@/features/identities/services/IIdentityService";

export const IdentityObject = builder.objectRef<PublicIdentity>("IdentityObject");

IdentityObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
