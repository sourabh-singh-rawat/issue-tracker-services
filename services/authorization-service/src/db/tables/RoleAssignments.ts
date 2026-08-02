import { relations, sql } from "drizzle-orm";
import { index, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Roles } from "@/db/tables/Roles";

export const RoleAssignments = pgTable(
  "role_assignments",
  {
    ...idColumn,
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id, { onDelete: "cascade" }),
    subjectType: varchar("subject_type", { length: 100 }).notNull(),
    subjectId: varchar("subject_id", { length: 255 }).notNull(),
    scopeType: varchar("scope_type", { length: 100 }),
    scopeId: varchar("scope_id", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("role_assignments_role_id_idx").on(table.roleId),
    index("role_assignments_subject_idx").on(table.subjectType, table.subjectId),
    index("role_assignments_scope_idx").on(table.scopeType, table.scopeId),
    uniqueIndex("role_assignments_global_uidx")
      .on(table.roleId, table.subjectType, table.subjectId)
      .where(sql`${table.scopeType} is null and ${table.scopeId} is null`),
    uniqueIndex("role_assignments_scoped_uidx")
      .on(table.roleId, table.subjectType, table.subjectId, table.scopeType, table.scopeId)
      .where(sql`${table.scopeType} is not null and ${table.scopeId} is not null`),
  ],
);

export const RoleAssignmentsRelations = relations(RoleAssignments, ({ one }) => ({
  role: one(Roles, {
    fields: [RoleAssignments.roleId],
    references: [Roles.id],
  }),
}));

export type RoleAssignment = typeof RoleAssignments.$inferSelect;
export type NewRoleAssignment = typeof RoleAssignments.$inferInsert;
