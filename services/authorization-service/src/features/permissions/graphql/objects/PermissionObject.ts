import { builder } from "@pine/graphql-core";
import type { Permission } from "@/features/permissions/repositories/IPermissionRepository";

export const CapabilityObject = builder.objectRef<Permission>("CapabilityObject");

CapabilityObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    type: t.exposeString("type"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    isStatic: t.exposeBoolean("isStatic"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
