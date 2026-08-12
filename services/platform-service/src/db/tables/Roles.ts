import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { MembershipRoles } from "@/db/tables/MembershipRoles";

export const Roles = pgTable("roles", {
  ...idColumn,
  ...auditColumns,
});

export const RolesRelations = relations(Roles, ({ many }) => ({
  membershipRoles: many(MembershipRoles),
}));

export type Role = typeof Roles.$inferSelect;
export type NewRole = typeof Roles.$inferInsert;
