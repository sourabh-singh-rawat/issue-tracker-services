import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { MembershipRoles } from "@/db/tables/MembershipRoles";
import { Organizations } from "@/db/tables/Organizations";

export const Memberships = pgTable(
  "memberships",
  {
    ...idColumn,
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => Organizations.id),
    identityId: uuid("identity_id").notNull(),
    ...auditColumns,
  },
  (table) => [unique().on(table.organizationId, table.identityId)],
);

export const MembershipsRelations = relations(Memberships, ({ one, many }) => ({
  organization: one(Organizations, {
    fields: [Memberships.organizationId],
    references: [Organizations.id],
  }),
  membershipRoles: many(MembershipRoles),
}));

export type Membership = typeof Memberships.$inferSelect;
export type NewMembership = typeof Memberships.$inferInsert;
