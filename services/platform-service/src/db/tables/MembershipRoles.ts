import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Memberships } from "@/db/tables/Memberships";
import { Roles } from "@/db/tables/Roles";

export const MembershipRoles = pgTable(
  "membership_roles",
  {
    ...idColumn,
    membershipId: uuid("membership_id")
      .notNull()
      .references(() => Memberships.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id),
    ...auditColumns,
  },
  (table) => [unique().on(table.membershipId, table.roleId)],
);

export const MembershipRolesRelations = relations(MembershipRoles, ({ one }) => ({
  membership: one(Memberships, {
    fields: [MembershipRoles.membershipId],
    references: [Memberships.id],
  }),
  role: one(Roles, {
    fields: [MembershipRoles.roleId],
    references: [Roles.id],
  }),
}));

export type MembershipRole = typeof MembershipRoles.$inferSelect;
export type NewMembershipRole = typeof MembershipRoles.$inferInsert;
