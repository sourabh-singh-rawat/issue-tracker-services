import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRoleAssignmentObject } from "@/features/platformRoleAssignments/graphql/objects/PlatformRoleAssignmentObject";
import type { IPlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services";

builder.queryFields((t) => ({
  getPlatformRoleAssignments: t.field({
    type: [PlatformRoleAssignmentObject],
    args: {
      platformRoleId: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IPlatformRoleAssignmentService>(
        TYPES.PlatformRoleAssignmentService,
      );
      return service.listPlatformRoleAssignments(
        {
          platformRoleId: args.platformRoleId ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
