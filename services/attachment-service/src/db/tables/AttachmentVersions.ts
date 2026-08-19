import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Attachments } from "@/db/tables/Attachments";
import { Identities } from "@/db/tables/Identities";

export const AttachmentVersions = pgTable("attachment_versions", {
  ...idColumn,
  attachmentId: uuid("attachment_id")
    .notNull()
    .references(() => Attachments.id),
  versionNumber: integer("version_number").notNull(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  fileSize: integer("file_size").notNull(),
  sha256: varchar("sha256", { length: 64 }).notNull(),
  storageProvider: text("storage_provider").notNull(),
  storageObjectKey: text("storage_object_key").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => Identities.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AttachmentVersion = typeof AttachmentVersions.$inferSelect;
export type NewAttachmentVersion = typeof AttachmentVersions.$inferInsert;
