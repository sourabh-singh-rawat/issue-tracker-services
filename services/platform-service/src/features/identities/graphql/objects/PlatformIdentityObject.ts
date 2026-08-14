import { builder } from "@pine/server";
import type { Identity } from "@/db";

export const PlatformIdentityObject = builder.objectRef<Identity>("PlatformIdentityObject");

PlatformIdentityObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    displayName: t.exposeString("displayName", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
