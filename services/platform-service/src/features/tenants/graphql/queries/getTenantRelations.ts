import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantRelationObject } from "@/features/tenants/graphql/objects/TenantRelationObject";
import type { ITenantRelationService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenantRelations: t.field({
    type: [TenantRelationObject],
    args: {
      tenantId: t.arg.string({ required: true }),
      relation: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantRelationService>(TYPES.TenantRelationService);
      return service.list(
        {
          tenantId: args.tenantId,
          relation: args.relation ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
