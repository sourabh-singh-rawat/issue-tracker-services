import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { TenantMember } from "@/db";
import { TenantRoleObject } from "@/features/tenantRoles/graphql/objects/TenantRoleObject";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";

export const TenantMemberObject = builder.objectRef<TenantMember>("TenantMemberObject");

TenantMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    roleId: t.exposeString("roleId"),
    identityId: t.exposeString("identityId"),
    assignedBy: t.exposeString("assignedBy", { nullable: true }),
    assignedAt: t.expose("assignedAt", { type: "DateTimeISO" }),
    expiresAt: t.expose("expiresAt", { type: "DateTimeISO", nullable: true }),
    reason: t.exposeString("reason", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    tenantRole: t.field({
      type: TenantRoleObject,
      nullable: true,
      resolve: async (member) => {
        const repository = container.get<ITenantRoleRepository>(TYPES.TenantRoleRepository);
        return repository.findById(member.roleId);
      },
    }),
  }),
});
