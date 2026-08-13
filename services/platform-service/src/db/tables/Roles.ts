import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { OrganizationRoles } from "@/db/tables/OrganizationRoles";
import { PlatformRoles } from "@/db/tables/PlatformRoles";
import { TenantRoles } from "@/db/tables/TenantRoles";

export const Roles = pgTable("roles", {
  ...idColumn,
  key: varchar("key", { length: 150 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  ...auditColumns,
});

export const RolesRelations = relations(Roles, ({ one }) => ({
  platformRole: one(PlatformRoles, {
    fields: [Roles.id],
    references: [PlatformRoles.roleId],
  }),
  tenantRole: one(TenantRoles, {
    fields: [Roles.id],
    references: [TenantRoles.roleId],
  }),
  organizationRole: one(OrganizationRoles, {
    fields: [Roles.id],
    references: [OrganizationRoles.roleId],
  }),
}));

export type Role = typeof Roles.$inferSelect;
export type NewRole = typeof Roles.$inferInsert;
