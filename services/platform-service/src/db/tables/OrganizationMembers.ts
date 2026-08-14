import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { OrganizationRoles } from "@/db/tables/OrganizationRoles";
import { Organizations } from "@/db/tables/Organizations";

export const OrganizationMembers = pgTable(
  "organization_members",
  {
    ...idColumn,
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => Organizations.id),
    roleId: uuid("role_id").notNull(),
    identityId: uuid("identity_id").notNull(),
    assignedBy: uuid("assigned_by"),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    reason: text("reason"),
    ...auditColumns,
  },
  (table) => [unique().on(table.organizationId, table.identityId, table.roleId)],
);

export const OrganizationMembersRelations = relations(OrganizationMembers, ({ one }) => ({
  organization: one(Organizations, {
    fields: [OrganizationMembers.organizationId],
    references: [Organizations.id],
  }),
  organizationRole: one(OrganizationRoles, {
    fields: [OrganizationMembers.roleId],
    references: [OrganizationRoles.roleId],
  }),
}));

export type OrganizationMember = typeof OrganizationMembers.$inferSelect;
export type NewOrganizationMember = typeof OrganizationMembers.$inferInsert;
