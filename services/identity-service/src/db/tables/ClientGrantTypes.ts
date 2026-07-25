import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Clients } from "@/db/tables/Clients";
import { Grants } from "@/db/tables/Grants";

export const ClientGrantTypes = pgTable(
  "client_grant_types",
  {
    ...idColumn,
    clientId: uuid("client_id")
      .notNull()
      .references(() => Clients.id),
    grantId: uuid("grant_id")
      .notNull()
      .references(() => Grants.id),
    ...auditColumns,
  },
  (table) => [unique().on(table.clientId, table.grantId)],
);

export const ClientGrantTypesRelations = relations(ClientGrantTypes, ({ one }) => ({
  client: one(Clients, {
    fields: [ClientGrantTypes.clientId],
    references: [Clients.id],
  }),
  grant: one(Grants, {
    fields: [ClientGrantTypes.grantId],
    references: [Grants.id],
  }),
}));

export type ClientGrantType = typeof ClientGrantTypes.$inferSelect;
export type NewClientGrantType = typeof ClientGrantTypes.$inferInsert;
