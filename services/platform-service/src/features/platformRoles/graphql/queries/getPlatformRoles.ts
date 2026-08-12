import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.queryFields((t) => ({
  getPlatformRoles: t.field({
    type: [PlatformRoleObject],
    resolve: async (_root, _args, ctx) => {
      const service = container.get<IPlatformRoleService>(TYPES.PlatformRoleService);
      return service.listPlatformRoles(ctx.user!.id);
    },
  }),
}));
