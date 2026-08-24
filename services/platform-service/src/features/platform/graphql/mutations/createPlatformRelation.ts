import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreatePlatformRelationInput } from "@/features/platform/graphql/inputs/CreatePlatformRelationInput";
import { PlatformRelationObject } from "@/features/platform/graphql/objects/PlatformRelationObject";
import type { IPlatformRelationService } from "@/features/platform/services";

builder.mutationFields((t) => ({
  createPlatformRelation: t.field({
    type: PlatformRelationObject,
    args: {
      input: t.arg({ type: CreatePlatformRelationInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformRelationService>(TYPES.PlatformRelationService);

      return service.create(
        {
          relation: input.relation,
          identityId: input.identityId,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
