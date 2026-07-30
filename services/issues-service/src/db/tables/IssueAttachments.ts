import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const IssueAttachments = pgTable("issue_attachments", {
  ...idColumn,
  name: text("name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  ownerId: text("owner_id").notNull(),
  issueId: text("issue_id").notNull(),
  bucketName: text("bucket_name"),
  path: text("path"),
  variant: text("variant"),
  ...auditColumns,
});

export type IssueAttachment = typeof IssueAttachments.$inferSelect;
export type NewIssueAttachment = typeof IssueAttachments.$inferInsert;
