import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IPlatformRoleService } from "@/features/platformRoles/services";

builder.mutationFields((t) => ({
  deletePlatformRole: t.string({
    args: {
      id: t.arg.string({ required: true }),
      platformId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id, platformId }, ctx) => {
      const service = container.get<IPlatformRoleService>(TYPES.PlatformRoleService);
      await service.deletePlatformRole(id, platformId, ctx.user!.id);
      return "Platform role deleted successfully.";
    },
  }),
}));
