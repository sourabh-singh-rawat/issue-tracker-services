import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Identities } from "@/db/tables/Identities";

export const IdentityProfiles = pgTable("identity_profiles", {
  ...idColumn,
  identityId: uuid("identity_id")
    .notNull()
    .references(() => Identities.id),
  displayName: text("display_name").notNull(),
  description: text("description"),
  photoUrl: text("photo_url"),
  ...auditColumns,
});

export const IdentityProfilesRelations = relations(IdentityProfiles, ({ one }) => ({
  identity: one(Identities, {
    fields: [IdentityProfiles.identityId],
    references: [Identities.id],
  }),
}));

export type IdentityProfile = typeof IdentityProfiles.$inferSelect;
export type NewIdentityProfile = typeof IdentityProfiles.$inferInsert;
