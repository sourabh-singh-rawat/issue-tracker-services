import { builder } from "@pine/graphql-core";
import type { User } from "@/db";

export const UserObject = builder.objectRef<User>("UserObject");

UserObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    email: t.exposeString("email"),
    idpId: t.exposeString("idpId", { nullable: true }),
    idpProvider: t.exposeString("idpProvider", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
