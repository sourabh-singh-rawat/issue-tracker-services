import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformMemberObject } from "@/features/platform/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platform/services";

builder.queryFields((t) => ({
  getPlatformMember: t.field({
    type: PlatformMemberObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformMemberService>(TYPES.PlatformMemberService);
      return service.getById(id, ctx.user!.id);
    },
  }),
}));
