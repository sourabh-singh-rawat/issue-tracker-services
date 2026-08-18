import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformMemberObject } from "@/features/platform/graphql/objects/PlatformMemberObject";
import type { IPlatformRelationService } from "@/features/platform/services";

builder.queryFields((t) => ({
  getPlatformMembers: t.field({
    type: [PlatformMemberObject],
    args: {
      relation: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IPlatformRelationService>(TYPES.PlatformRelationService);
      return service.list(
        {
          relation: args.relation ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
