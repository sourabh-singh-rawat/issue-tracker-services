import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { PlatformRoleAssignments } from "@/db/tables/PlatformRoleAssignments";

export const PlatformRoles = pgTable("platform_roles", {
  ...idColumn,
  key: varchar("key", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  ...auditColumns,
});

export const PlatformRolesRelations = relations(PlatformRoles, ({ many }) => ({
  assignments: many(PlatformRoleAssignments),
}));

export type PlatformRole = typeof PlatformRoles.$inferSelect;
export type NewPlatformRole = typeof PlatformRoles.$inferInsert;
