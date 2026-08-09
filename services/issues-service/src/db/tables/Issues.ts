import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Projects } from "@/db/tables/Projects";

export const Issues = pgTable("items", {
  ...idColumn,
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  statusId: uuid("status_id").notNull(),
  priority: text("priority").notNull(),
  projectId: uuid("list_id").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  createdById: uuid("created_by_id").notNull(),
  updatedById: uuid("updated_by_id"),
  parentIssueId: uuid("parent_item_id"),
  estimate: integer("estimate"),
  component: text("component"),
  ...auditColumns,
});

export const IssuesRelations = relations(Issues, ({ one }) => ({
  project: one(Projects, {
    fields: [Issues.projectId],
    references: [Projects.id],
  }),
  parentIssue: one(Issues, {
    fields: [Issues.parentIssueId],
    references: [Issues.id],
    relationName: "issue_hierarchy",
  }),
}));

export type Issue = typeof Issues.$inferSelect;
export type NewIssue = typeof Issues.$inferInsert;
