import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns } from "@/db/audit-columns";
import { Users } from "@/db/tables/Users";

export const UserProfiles = pgTable("user_profiles", {
  ...auditColumns,
  userId: uuid("user_id")
    .notNull()
    .references(() => Users.id),
  displayName: text("display_name").notNull(),
  description: text("description"),
  photoUrl: text("photo_url"),
});

export const UserProfilesRelations = relations(UserProfiles, ({ one }) => ({
  user: one(Users, {
    fields: [UserProfiles.userId],
    references: [Users.id],
  }),
}));

export type UserProfile = typeof UserProfiles.$inferSelect;
export type NewUserProfile = typeof UserProfiles.$inferInsert;
