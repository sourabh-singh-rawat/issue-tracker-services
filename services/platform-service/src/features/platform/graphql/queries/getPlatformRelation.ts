import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRelationObject } from "@/features/platform/graphql/objects/PlatformRelationObject";
import type { IPlatformRelationService } from "@/features/platform/services";

builder.queryFields((t) => ({
  getPlatformRelation: t.field({
    type: PlatformRelationObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformRelationService>(TYPES.PlatformRelationService);
      return service.getById(id, requireIdentityId(ctx));
    },
  }),
}));
