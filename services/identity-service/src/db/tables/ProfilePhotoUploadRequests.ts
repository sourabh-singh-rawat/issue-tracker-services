import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Profiles } from "@/db/tables/Profiles";

export const ProfilePhotoUploadRequests = pgTable("profile_photo_upload_requests", {
  ...idColumn,
  profileId: uuid("profile_id")
    .notNull()
    .references(() => Profiles.id),
  status: text("status").notNull(),
  attachmentId: uuid("attachment_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const ProfilePhotoUploadRequestsRelations = relations(
  ProfilePhotoUploadRequests,
  ({ one }) => ({
    profile: one(Profiles, {
      fields: [ProfilePhotoUploadRequests.profileId],
      references: [Profiles.id],
    }),
  }),
);

export type ProfilePhotoUploadRequest = typeof ProfilePhotoUploadRequests.$inferSelect;
export type NewProfilePhotoUploadRequest = typeof ProfilePhotoUploadRequests.$inferInsert;
