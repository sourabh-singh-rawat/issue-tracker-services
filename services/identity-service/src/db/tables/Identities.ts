import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { IdentityProfiles } from "@/db/tables/IdentityProfiles";

export const Identities = pgTable("identities", {
  ...idColumn,
  email: text("email").notNull().unique(),
  idpId: text("idp_id"),
  idpProvider: text("idp_provider"),
  ...auditColumns,
});

export const IdentitiesRelations = relations(Identities, ({ one }) => ({
  profile: one(IdentityProfiles, {
    fields: [Identities.id],
    references: [IdentityProfiles.identityId],
  }),
}));

export type Identity = typeof Identities.$inferSelect;
export type NewIdentity = typeof Identities.$inferInsert;
