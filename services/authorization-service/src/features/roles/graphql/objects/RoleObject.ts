import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import type { Role } from "@/db";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import type { IRoleCapabilityRepository } from "@/features/roles/repositories";

export const RoleObject = builder.objectRef<Role>("RoleObject");

RoleObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    key: t.exposeString("key"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    system: t.exposeBoolean("isSystem"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    capabilities: t.field({
      type: [CapabilityObject],
      resolve: async (role) => {
        const roleCapabilityRepository = container.get<IRoleCapabilityRepository>(
          TYPES.RoleCapabilityRepository,
        );
        const capabilityRepository = container.get<ICapabilityRepository>(
          TYPES.CapabilityRepository,
        );

        const capabilityKeys = await roleCapabilityRepository.findCapabilityKeysByRoleId(role.id);
        if (capabilityKeys.length === 0) {
          return [];
        }

        const capabilities = await capabilityRepository.findByKeys(capabilityKeys);
        const byKey = new Map(capabilities.map((capability) => [capability.key, capability]));

        return capabilityKeys
          .map((key) => byKey.get(key))
          .filter((capability): capability is NonNullable<typeof capability> =>
            Boolean(capability),
          );
      },
    }),
  }),
});
