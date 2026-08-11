import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { MembershipRoles } from "@/db/tables/MembershipRoles";

/**
 * Local projection of roles owned by authorization-service.
 * Only id + audit/version fields are kept for FK and eventual consistency.
 */
export const Roles = pgTable("roles", {
  ...idColumn,
  ...auditColumns,
});

export const RolesRelations = relations(Roles, ({ many }) => ({
  membershipRoles: many(MembershipRoles),
}));

export type Role = typeof Roles.$inferSelect;
export type NewRole = typeof Roles.$inferInsert;
