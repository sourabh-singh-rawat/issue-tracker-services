import { relations } from "drizzle-orm";
import { index, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { Resources } from "@/db/tables/Resources";
import { Roles } from "@/db/tables/Roles";

export const RoleResources = pgTable(
  "role_resources",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id, { onDelete: "cascade" }),
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => Resources.id, { onDelete: "cascade" }),
    relation: varchar("relation", { length: 100 }).notNull(),
  },
  (table) => [
    primaryKey({
      name: "role_resources_pkey",
      columns: [table.roleId, table.resourceId, table.relation],
    }),
    index("role_resources_role_id_idx").on(table.roleId),
    index("role_resources_resource_id_idx").on(table.resourceId),
  ],
);

export const RoleResourcesRelations = relations(RoleResources, ({ one }) => ({
  role: one(Roles, {
    fields: [RoleResources.roleId],
    references: [Roles.id],
  }),
  resource: one(Resources, {
    fields: [RoleResources.resourceId],
    references: [Resources.id],
  }),
}));

export type RoleResource = typeof RoleResources.$inferSelect;
export type NewRoleResource = typeof RoleResources.$inferInsert;
