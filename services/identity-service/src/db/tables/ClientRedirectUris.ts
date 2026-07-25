import { relations } from "drizzle-orm";
import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "@/db/audit-columns";
import { Clients } from "@/db/tables/Clients";

export const ClientRedirectUris = pgTable(
  "client_redirect_uris",
  {
    ...auditColumns,
    clientId: uuid("client_id")
      .notNull()
      .references(() => Clients.id),
    uri: text("uri").notNull(),
  },
  (table) => [unique().on(table.clientId, table.uri)],
);

export const ClientRedirectUrisRelations = relations(ClientRedirectUris, ({ one }) => ({
  client: one(Clients, {
    fields: [ClientRedirectUris.clientId],
    references: [Clients.id],
  }),
}));

export type ClientRedirectUri = typeof ClientRedirectUris.$inferSelect;
export type NewClientRedirectUri = typeof ClientRedirectUris.$inferInsert;
