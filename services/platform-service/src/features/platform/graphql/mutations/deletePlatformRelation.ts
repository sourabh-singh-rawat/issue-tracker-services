import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IPlatformRelationService } from "@/features/platform/services";

builder.mutationFields((t) => ({
  deletePlatformRelation: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformRelationService>(TYPES.PlatformRelationService);
      await service.delete(id, requireIdentityId(ctx));
      return "Platform relation deleted successfully.";
    },
  }),
}));
