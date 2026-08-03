import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Roles } from "@/db/tables/Roles";

export const RoleAssignments = pgTable(
  "role_assignments",
  {
    ...idColumn,
    roleId: uuid("role_id")
      .notNull()
      .references(() => Roles.id, { onDelete: "cascade" }),
    identityType: varchar("identity_type", { length: 100 }).notNull(),
    identityId: varchar("identity_id", { length: 255 }).notNull(),
    assignedBy: varchar("assigned_by", { length: 255 }),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    reason: text("reason"),
  },
  (table) => [
    index("role_assignments_role_id_idx").on(table.roleId),
    index("role_assignments_identity_idx").on(table.identityType, table.identityId),
    uniqueIndex("role_assignments_role_identity_uidx").on(
      table.roleId,
      table.identityType,
      table.identityId,
    ),
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
