import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { IdentityRelationsObject } from "@/features/platform/graphql/objects/IdentityRelationsObject";
import type { IIdentityRelationService } from "@/features/platform/services/IIdentityRelationService";

builder.queryFields((t) => ({
  getIdentityRelations: t.field({
    type: IdentityRelationsObject,
    args: {
      identityId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IIdentityRelationService>(TYPES.IdentityRelationService);
      return service.list(args.identityId, requireIdentityId(ctx));
    },
  }),
}));
