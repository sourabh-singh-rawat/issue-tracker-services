import { relations } from "drizzle-orm";
import { index, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { Capabilities } from "@/db/tables/Capabilities";
import { Roles } from "@/db/tables/Roles";

export const RoleCapabilities = pgTable(
  "role_capabilities",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id, { onDelete: "cascade" }),
    capabilityId: uuid("capability_id")
      .notNull()
      .references(() => Capabilities.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "role_capabilities_pkey",
      columns: [table.roleId, table.capabilityId],
    }),
    index("role_capabilities_role_id_idx").on(table.roleId),
    index("role_capabilities_capability_id_idx").on(table.capabilityId),
  ],
);

export const RoleCapabilitiesRelations = relations(RoleCapabilities, ({ one }) => ({
  role: one(Roles, {
    fields: [RoleCapabilities.roleId],
    references: [Roles.id],
  }),
  capability: one(Capabilities, {
    fields: [RoleCapabilities.capabilityId],
    references: [Capabilities.id],
  }),
}));

export type RoleCapability = typeof RoleCapabilities.$inferSelect;
export type NewRoleCapability = typeof RoleCapabilities.$inferInsert;
