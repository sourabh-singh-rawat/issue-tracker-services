import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateRoleInput } from "@/features/roles/graphql/inputs/CreateRoleInput";
import { RoleObject } from "@/features/roles/graphql/objects/RoleObject";
import type { IRoleService } from "@/features/roles/services";

builder.mutationFields((t) => ({
  createRole: t.field({
    type: RoleObject,
    args: {
      input: t.arg({ type: CreateRoleInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IRoleService>(TYPES.RoleService);

      return service.createRole({
        key: input.key,
        name: input.name,
        description: input.description ?? undefined,
        capabilityKeys: input.capabilityKeys ?? undefined,
      });
    },
  }),
}));
