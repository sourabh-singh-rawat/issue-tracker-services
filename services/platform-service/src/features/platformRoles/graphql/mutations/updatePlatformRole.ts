import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { UpdatePlatformRoleInput } from "@/features/platformRoles/graphql/inputs/UpdatePlatformRoleInput";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.mutationFields((t) => ({
  updatePlatformRole: t.field({
    type: PlatformRoleObject,
    args: {
      input: t.arg({ type: UpdatePlatformRoleInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = getContainer().get<IPlatformRoleService>(TYPES.PlatformRoleService);

      return service.updatePlatformRole(
        input.id,
        {
          name: input.name ?? undefined,
          description: input.description ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
