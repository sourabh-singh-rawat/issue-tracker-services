import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Profiles } from "@/db/tables/Profiles";

export const Identities = pgTable("identities", {
  ...idColumn,
  idpId: text("idp_id").notNull().unique(),
  idpProvider: text("idp_provider").notNull(),
  ...auditColumns,
});

export const IdentitiesRelations = relations(Identities, ({ one }) => ({
  profile: one(Profiles, {
    fields: [Identities.id],
    references: [Profiles.identityId],
  }),
}));

export type Identity = typeof Identities.$inferSelect;
export type NewIdentity = typeof Identities.$inferInsert;
