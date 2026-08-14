import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { PlatformRole } from "@/db";
import { PermissionObject } from "@/graphql/objects/PermissionObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

export const PlatformRoleObject = builder.objectRef<PlatformRole>("PlatformRoleObject");

PlatformRoleObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    isSystem: t.exposeBoolean("isSystem"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    permissions: t.field({
      type: [PermissionObject],
      resolve: (role) => {
        const service = container.get<IPlatformRoleService>(TYPES.PlatformRoleService);
        return service.getPermissionsForPlatformRole(role);
      },
    }),
  }),
});
