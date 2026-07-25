import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns } from "@/db/audit-columns";
import { UserProfiles } from "@/db/tables/UserProfiles";

export const Users = pgTable("users", {
  ...auditColumns,
  email: text("email").notNull().unique(),
  idpId: text("idp_id"),
  idpProvider: text("idp_provider"),
});

export const UsersRelations = relations(Users, ({ one }) => ({
  profile: one(UserProfiles, {
    fields: [Users.id],
    references: [UserProfiles.userId],
  }),
}));

export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
