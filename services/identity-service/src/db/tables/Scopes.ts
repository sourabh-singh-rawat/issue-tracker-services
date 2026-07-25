import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns } from "@/db/audit-columns";
import { ClientScopes } from "@/db/tables/ClientScopes";

export const Scopes = pgTable("scopes", {
  ...auditColumns,
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const ScopesRelations = relations(Scopes, ({ many }) => ({
  clientScopes: many(ClientScopes),
}));

export type Scope = typeof Scopes.$inferSelect;
export type NewScope = typeof Scopes.$inferInsert;
