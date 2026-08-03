import { builder } from "@pine/graphql-core";
import type { Capability } from "@/db";

export const CapabilityObject = builder.objectRef<Capability>("CapabilityObject");

CapabilityObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    key: t.exposeString("key"),
    service: t.exposeString("service"),
    resource: t.exposeString("resource"),
    action: t.exposeString("action"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
