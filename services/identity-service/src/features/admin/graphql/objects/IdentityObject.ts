import { builder } from "@pine/server";
import type { Identity } from "@/db";

export const IdentityObject = builder.objectRef<Identity>("IdentityObject");

IdentityObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    idpId: t.exposeString("idpId"),
    idpProvider: t.exposeString("idpProvider"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
