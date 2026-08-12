import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { OrganizationMembers } from "@/db/tables/OrganizationMembers";
import { Organizations } from "@/db/tables/Organizations";
import { Roles } from "@/db/tables/Roles";

export const OrganizationRoles = pgTable(
  "organization_roles",
  {
    ...idColumn,
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => Organizations.id),
  },
  (table) => [unique().on(table.roleId)],
);

export const OrganizationRolesRelations = relations(OrganizationRoles, ({ one, many }) => ({
  role: one(Roles, {
    fields: [OrganizationRoles.roleId],
    references: [Roles.id],
  }),
  organization: one(Organizations, {
    fields: [OrganizationRoles.organizationId],
    references: [Organizations.id],
  }),
  members: many(OrganizationMembers),
}));

export type OrganizationRoleLink = typeof OrganizationRoles.$inferSelect;
export type NewOrganizationRoleLink = typeof OrganizationRoles.$inferInsert;

export type OrganizationRole = typeof Roles.$inferSelect & {
  organizationId: string;
};
