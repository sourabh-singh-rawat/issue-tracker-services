import { ALL_SYSTEM_ROLES } from "@pine/authorization";
import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { Role } from "@/db";
import { CapabilityObject } from "@/features/permissions/graphql/objects/PermissionObject";
import type { IPermissionRepository } from "@/features/permissions/repositories";
import type { IRoleResourceRepository } from "@/features/roles/repositories";

const SYSTEM_ROLE_KEYS = new Set(ALL_SYSTEM_ROLES.map((role) => role.key));
const SYSTEM_ROLE_IDS = new Set(ALL_SYSTEM_ROLES.map((role) => role.id));

export const RoleObject = builder.objectRef<Role>("RoleObject");

RoleObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    system: t.boolean({
      resolve: (role) => SYSTEM_ROLE_IDS.has(role.id) || SYSTEM_ROLE_KEYS.has(role.key),
    }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    capabilities: t.field({
      type: [CapabilityObject],
      resolve: async (role) => {
        const roleResourceRepository = container.get<IRoleResourceRepository>(
          TYPES.RoleResourceRepository,
        );
        const permissionRepository = container.get<IPermissionRepository>(
          TYPES.PermissionRepository,
        );

        const resourceKeys = await roleResourceRepository.findResourceKeysByRoleId(role.id);
        if (resourceKeys.length === 0) {
          return [];
        }

        const resources = await permissionRepository.findByKeys(resourceKeys);
        const byKey = new Map(resources.map((resource) => [resource.key, resource]));

        return resourceKeys
          .map((key) => byKey.get(key))
          .filter((resource): resource is NonNullable<typeof resource> => Boolean(resource));
      },
    }),
  }),
});
