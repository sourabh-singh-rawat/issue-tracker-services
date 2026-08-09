import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateRoleInput } from "@/features/roles/graphql/inputs/UpdateRoleInput";
import { RoleObject } from "@/features/roles/graphql/objects/RoleObject";
import type { IRoleService } from "@/features/roles/services";

builder.mutationFields((t) => ({
  updateRole: t.field({
    type: RoleObject,
    args: {
      input: t.arg({ type: UpdateRoleInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IRoleService>(TYPES.RoleService);

      return service.updateRole(input.roleId, {
        name: input.name ?? undefined,
        description: input.description ?? undefined,
        capabilityKeys: input.capabilityKeys ?? undefined,
      });
    },
  }),
}));
