import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { TenantRole } from "@/db";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ITenantRoleService } from "@/features/tenantRoles/services";

export const TenantRoleObject = builder.objectRef<TenantRole>("TenantRoleObject");

TenantRoleObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    isSystem: t.exposeBoolean("isSystem"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    capabilities: t.field({
      type: [CapabilityObject],
      resolve: async (role) => {
        const service = container.get<ITenantRoleService>(TYPES.TenantRoleService);
        return service.getCapabilitiesForTenantRole(role);
      },
    }),
  }),
});
