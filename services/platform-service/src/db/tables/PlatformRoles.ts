import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { PlatformMembers } from "@/db/tables/PlatformMembers";
import { Roles } from "@/db/tables/Roles";

export const PlatformRoles = pgTable(
  "platform_roles",
  {
    ...idColumn,
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id),
  },
  (table) => [unique().on(table.roleId)],
);

export const PlatformRolesRelations = relations(PlatformRoles, ({ one, many }) => ({
  role: one(Roles, {
    fields: [PlatformRoles.roleId],
    references: [Roles.id],
  }),
  members: many(PlatformMembers),
}));

export type PlatformRoleLink = typeof PlatformRoles.$inferSelect;
export type NewPlatformRoleLink = typeof PlatformRoles.$inferInsert;

export type PlatformRole = typeof Roles.$inferSelect;
export type NewPlatformRole = typeof Roles.$inferInsert;
