import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { ClientGrantTypes } from "@/db/tables/ClientGrantTypes";
import { ClientRedirectUris } from "@/db/tables/ClientRedirectUris";
import { ClientScopes } from "@/db/tables/ClientScopes";

export const Clients = pgTable("clients", {
  ...idColumn,
  name: text("name").notNull(),
  oauthProvider: text("oauth_provider"),
  providerClientId: text("provider_client_id"),
  ...auditColumns,
});

export const ClientsRelations = relations(Clients, ({ many }) => ({
  redirectUris: many(ClientRedirectUris),
  scopes: many(ClientScopes),
  grantTypes: many(ClientGrantTypes),
}));

export type Client = typeof Clients.$inferSelect;
export type NewClient = typeof Clients.$inferInsert;
