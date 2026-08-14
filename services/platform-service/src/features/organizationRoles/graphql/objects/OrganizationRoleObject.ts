import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { OrganizationRole } from "@/db";
import { PermissionObject } from "@/graphql/objects/PermissionObject";
import type { IOrganizationRoleService } from "@/features/organizationRoles/services";

export const OrganizationRoleObject =
  builder.objectRef<OrganizationRole>("OrganizationRoleObject");

OrganizationRoleObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    organizationId: t.exposeString("organizationId"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    isSystem: t.exposeBoolean("isSystem"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    permissions: t.field({
      type: [PermissionObject],
      resolve: (role) => {
        const service = container.get<IOrganizationRoleService>(TYPES.OrganizationRoleService);
        return service.getPermissionsForOrganizationRole(role);
      },
    }),
  }),
});
