import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformIdentityObject } from "@/features/identities/graphql/objects/PlatformIdentityObject";
import type { IIdentityService } from "@/features/identities/services";

builder.queryFields((t) => ({
  getIdentities: t.field({
    type: [PlatformIdentityObject],
    args: {
      platformId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { platformId }, ctx) => {
      const service = container.get<IIdentityService>(TYPES.IdentityService);
      return service.listIdentities(platformId, ctx.user!.id);
    },
  }),
}));
