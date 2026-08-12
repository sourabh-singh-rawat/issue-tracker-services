import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Roles } from "@/db/tables/Roles";
import { TenantMembers } from "@/db/tables/TenantMembers";
import { Tenants } from "@/db/tables/Tenants";

export const TenantRoles = pgTable(
  "tenant_roles",
  {
    ...idColumn,
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => Tenants.id),
  },
  (table) => [unique().on(table.roleId)],
);

export const TenantRolesRelations = relations(TenantRoles, ({ one, many }) => ({
  role: one(Roles, {
    fields: [TenantRoles.roleId],
    references: [Roles.id],
  }),
  tenant: one(Tenants, {
    fields: [TenantRoles.tenantId],
    references: [Tenants.id],
  }),
  members: many(TenantMembers),
}));

export type TenantRoleLink = typeof TenantRoles.$inferSelect;
export type NewTenantRoleLink = typeof TenantRoles.$inferInsert;

export type TenantRole = typeof Roles.$inferSelect & {
  tenantId: string;
};
