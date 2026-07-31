import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Identities } from "@/db/tables/Identities";

export const Attachments = pgTable("attachments", {
  ...idColumn,
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  contentType: text("content_type").notNull(),
  thumbnailLink: text("thumbnail_link").notNull(),
  imageLink: text("image_link").notNull(),
  bucket: text("bucket").notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => Identities.id),
  issueId: uuid("issue_id").notNull(),
  ...auditColumns,
});

export type Attachment = typeof Attachments.$inferSelect;
export type NewAttachment = typeof Attachments.$inferInsert;
