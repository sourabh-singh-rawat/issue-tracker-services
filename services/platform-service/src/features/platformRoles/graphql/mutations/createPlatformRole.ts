import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { CreatePlatformRoleInput } from "@/features/platformRoles/graphql/inputs/CreatePlatformRoleInput";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.mutationFields((t) => ({
  createPlatformRole: t.field({
    type: PlatformRoleObject,
    args: {
      input: t.arg({ type: CreatePlatformRoleInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = getContainer().get<IPlatformRoleService>(TYPES.PlatformRoleService);

      return service.createPlatformRole(
        {
          key: input.key,
          name: input.name,
          description: input.description ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
