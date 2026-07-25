import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { ClientScopes } from "@/db/tables/ClientScopes";

export const Scopes = pgTable("scopes", {
  ...idColumn,
  name: text("name").notNull().unique(),
  description: text("description"),
  ...auditColumns,
});

export const ScopesRelations = relations(Scopes, ({ many }) => ({
  clientScopes: many(ClientScopes),
}));

export type Scope = typeof Scopes.$inferSelect;
export type NewScope = typeof Scopes.$inferInsert;
