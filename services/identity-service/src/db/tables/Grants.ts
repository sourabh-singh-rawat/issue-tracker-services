import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns } from "@/db/audit-columns";
import { ClientGrantTypes } from "@/db/tables/ClientGrantTypes";

export const Grants = pgTable("grants", {
  ...auditColumns,
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const GrantsRelations = relations(Grants, ({ many }) => ({
  clientGrantTypes: many(ClientGrantTypes),
}));

export type Grant = typeof Grants.$inferSelect;
export type NewGrant = typeof Grants.$inferInsert;
