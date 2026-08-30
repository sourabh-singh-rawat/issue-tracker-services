import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRelationObject } from "@/features/platform/graphql/objects/PlatformRelationObject";
import type { IPlatformRelationService } from "@/features/platform/services";

builder.queryFields((t) => ({
  getPlatformRelations: t.field({
    type: [PlatformRelationObject],
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
        requireIdentityId(ctx),
      );
    },
  }),
}));
