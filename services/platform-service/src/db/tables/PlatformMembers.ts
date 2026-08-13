import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { PlatformRoles } from "@/db/tables/PlatformRoles";

export const PlatformMembers = pgTable("platform_members",
  {
    ...idColumn,
    platformRoleId: uuid("platform_role_id")
      .notNull()
      .references(() => PlatformRoles.roleId),
    identityId: uuid("identity_id").notNull(),
    assignedBy: uuid("assigned_by"),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    reason: text("reason"),
    ...auditColumns,
  },
  (table) => [unique().on(table.platformRoleId, table.identityId)],
);

export const PlatformMembersRelations = relations(
  PlatformMembers,
  ({ one }) => ({
    platformRole: one(PlatformRoles, {
      fields: [PlatformMembers.platformRoleId],
      references: [PlatformRoles.roleId],
    }),
  }),
);

export type PlatformMember = typeof PlatformMembers.$inferSelect;
export type NewPlatformMember = typeof PlatformMembers.$inferInsert;
