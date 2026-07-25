import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { ClientGrantTypes } from "@/db/tables/ClientGrantTypes";

export const Grants = pgTable("grants", {
  ...idColumn,
  name: text("name").notNull().unique(),
  description: text("description"),
  ...auditColumns,
});

export const GrantsRelations = relations(Grants, ({ many }) => ({
  clientGrantTypes: many(ClientGrantTypes),
}));

export type Grant = typeof Grants.$inferSelect;
export type NewGrant = typeof Grants.$inferInsert;
