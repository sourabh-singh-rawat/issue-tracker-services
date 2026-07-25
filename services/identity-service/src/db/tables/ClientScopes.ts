import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Clients } from "@/db/tables/Clients";
import { Scopes } from "@/db/tables/Scopes";

export const ClientScopes = pgTable(
  "client_scopes",
  {
    ...idColumn,
    clientId: uuid("client_id")
      .notNull()
      .references(() => Clients.id),
    scopeId: uuid("scope_id")
      .notNull()
      .references(() => Scopes.id),
    ...auditColumns,
  },
  (table) => [unique().on(table.clientId, table.scopeId)],
);

export const ClientScopesRelations = relations(ClientScopes, ({ one }) => ({
  client: one(Clients, {
    fields: [ClientScopes.clientId],
    references: [Clients.id],
  }),
  scope: one(Scopes, {
    fields: [ClientScopes.scopeId],
    references: [Scopes.id],
  }),
}));

export type ClientScope = typeof ClientScopes.$inferSelect;
export type NewClientScope = typeof ClientScopes.$inferInsert;
