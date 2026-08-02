import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { RoleAssignments } from "@/db/tables/RoleAssignments";
import { RoleResources } from "@/db/tables/RoleResources";

export const Roles = pgTable("roles", {
  ...idColumn,
  key: varchar("key", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const RolesRelations = relations(Roles, ({ many }) => ({
  roleResources: many(RoleResources),
  roleAssignments: many(RoleAssignments),
}));

export type Role = typeof Roles.$inferSelect;
export type NewRole = typeof Roles.$inferInsert;
