import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformMemberObject } from "@/features/platformMembers/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platformMembers/services";

builder.queryFields((t) => ({
  getPlatformMember: t.field({
    type: PlatformMemberObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformMemberService>(
        TYPES.PlatformMemberService,
      );
      return service.getPlatformMemberById(id, ctx.user!.id);
    },
  }),
}));
