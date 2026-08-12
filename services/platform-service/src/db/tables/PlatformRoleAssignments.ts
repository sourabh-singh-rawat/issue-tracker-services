import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { PlatformRoles } from "@/db/tables/PlatformRoles";

export const PlatformRoleAssignments = pgTable(
  "platform_role_assignments",
  {
    ...idColumn,
    platformRoleId: uuid("platform_role_id")
      .notNull()
      .references(() => PlatformRoles.id),
    identityId: uuid("identity_id").notNull(),
    assignedBy: uuid("assigned_by"),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    reason: text("reason"),
    ...auditColumns,
  },
  (table) => [unique().on(table.platformRoleId, table.identityId)],
);

export const PlatformRoleAssignmentsRelations = relations(
  PlatformRoleAssignments,
  ({ one }) => ({
    platformRole: one(PlatformRoles, {
      fields: [PlatformRoleAssignments.platformRoleId],
      references: [PlatformRoles.id],
    }),
  }),
);

export type PlatformRoleAssignment = typeof PlatformRoleAssignments.$inferSelect;
export type NewPlatformRoleAssignment = typeof PlatformRoleAssignments.$inferInsert;
