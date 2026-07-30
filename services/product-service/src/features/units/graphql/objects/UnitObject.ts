import { builder } from "@pine/graphql-core";
import type { Unit } from "@/db";

export const UnitObject = builder.objectRef<Unit>("UnitObject");

UnitObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    code: t.exposeString("code"),
    name: t.exposeString("name"),
    symbol: t.exposeString("symbol", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
