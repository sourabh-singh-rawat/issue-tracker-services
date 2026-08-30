import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { ITenantRelationService } from "@/features/tenants/services";

builder.mutationFields((t) => ({
  deleteTenantRelation: t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantRelationService>(TYPES.TenantRelationService);
      await service.delete(args.id, requireIdentityId(ctx));
      return true;
    },
  }),
}));
