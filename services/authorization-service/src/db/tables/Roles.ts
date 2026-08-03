import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { RoleAssignments } from "@/db/tables/RoleAssignments";
import { RoleCapabilities } from "@/db/tables/RoleCapabilities";

export const Roles = pgTable("roles", {
  ...idColumn,
  key: varchar("key", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const RolesRelations = relations(Roles, ({ many }) => ({
  roleCapabilities: many(RoleCapabilities),
  roleAssignments: many(RoleAssignments),
}));

export type Role = typeof Roles.$inferSelect;
export type NewRole = typeof Roles.$inferInsert;
