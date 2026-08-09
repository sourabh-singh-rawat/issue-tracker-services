import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const IssueComments = pgTable("issue_comments", {
  ...idColumn,
  description: text("description").notNull(),
  issueId: uuid("issue_id").notNull(),
  userId: uuid("user_id").notNull(),
  ...auditColumns,
});

export type IssueComment = typeof IssueComments.$inferSelect;
export type NewIssueComment = typeof IssueComments.$inferInsert;
