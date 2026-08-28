import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantRelationObject } from "@/features/tenants/graphql/objects/TenantRelationObject";
import type { ITenantRelationService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenantRelation: t.field({
    type: TenantRelationObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantRelationService>(TYPES.TenantRelationService);
      return service.getById(args.id, requireIdentityId(ctx));
    },
  }),
}));
