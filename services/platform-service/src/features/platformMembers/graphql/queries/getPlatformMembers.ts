import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformMemberObject } from "@/features/platformMembers/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platformMembers/services";

builder.queryFields((t) => ({
  getPlatformMembers: t.field({
    type: [PlatformMemberObject],
    args: {
      platformRoleId: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IPlatformMemberService>(
        TYPES.PlatformMemberService,
      );
      return service.listPlatformMembers(
        {
          platformRoleId: args.platformRoleId ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
