import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const IssueActivities = pgTable("issue_activities", {
  ...idColumn,
  type: text("type").notNull(),
  issueId: uuid("issue_id").notNull(),
  projectId: uuid("project_id").notNull(),
  userId: uuid("user_id").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  ...auditColumns,
});

export type IssueActivity = typeof IssueActivities.$inferSelect;
export type NewIssueActivity = typeof IssueActivities.$inferInsert;
