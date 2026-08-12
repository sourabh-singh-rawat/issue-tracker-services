import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.queryFields((t) => ({
  getPlatformRole: t.field({
    type: PlatformRoleObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = getContainer().get<IPlatformRoleService>(TYPES.PlatformRoleService);
      return service.getPlatformRoleById(id, ctx.user!.id);
    },
  }),
}));
