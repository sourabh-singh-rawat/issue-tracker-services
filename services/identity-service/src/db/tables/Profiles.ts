import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Identities } from "@/db/tables/Identities";
import { ProfilePhotoUploadRequests } from "@/db/tables/ProfilePhotoUploadRequests";

export const Profiles = pgTable("profiles", {
  ...idColumn,
  identityId: uuid("identity_id")
    .notNull()
    .references(() => Identities.id),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name"),
  gender: text("gender"),
  description: text("description"),
  photoUrl: text("photo_url"),
  ...auditColumns,
});

export const ProfilesRelations = relations(Profiles, ({ one, many }) => ({
  identity: one(Identities, {
    fields: [Profiles.identityId],
    references: [Identities.id],
  }),
  photoUploadRequests: many(ProfilePhotoUploadRequests),
}));

export type Profile = typeof Profiles.$inferSelect;
export type NewProfile = typeof Profiles.$inferInsert;
