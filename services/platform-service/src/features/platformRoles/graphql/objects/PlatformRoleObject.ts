import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import type { PlatformRole } from "@/db";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
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
    capabilities: t.field({
      type: [CapabilityObject],
      resolve: async (role) => {
        const service = getContainer().get<IPlatformRoleService>(TYPES.PlatformRoleService);
        return service.getCapabilitiesForPlatformRole(role);
      },
    }),
  }),
});
