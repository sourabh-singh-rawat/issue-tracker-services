import { pgTable, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const IssueAssignees = pgTable("item_assignees", {
  ...idColumn,
  issueId: uuid("item_id").notNull(),
  userId: uuid("user_id").notNull(),
  ...auditColumns,
});

export type IssueAssignee = typeof IssueAssignees.$inferSelect;
export type NewIssueAssignee = typeof IssueAssignees.$inferInsert;
