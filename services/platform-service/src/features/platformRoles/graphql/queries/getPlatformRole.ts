import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.queryFields((t) => ({
  getPlatformRole: t.field({
    type: PlatformRoleObject,
    args: {
      id: t.arg.string({ required: true }),
      platformId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id, platformId }, ctx) => {
      const service = container.get<IPlatformRoleService>(TYPES.PlatformRoleService);
      return service.getPlatformRoleById(id, platformId, ctx.user!.id);
    },
  }),
}));
