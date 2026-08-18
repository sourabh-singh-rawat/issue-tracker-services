import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreateTenantRelationInput } from "@/features/tenants/graphql/inputs/CreateTenantRelationInput";
import { TenantRelationObject } from "@/features/tenants/graphql/objects/TenantRelationObject";
import type { ITenantRelationService } from "@/features/tenants/services";

builder.mutationFields((t) => ({
  createTenantRelation: t.field({
    type: TenantRelationObject,
    args: {
      input: t.arg({ type: CreateTenantRelationInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<ITenantRelationService>(TYPES.TenantRelationService);

      return service.create(
        {
          tenantId: input.tenantId,
          relation: input.relation,
          identityId: input.identityId,
        },
        ctx.user!.id,
      );
    },
  }),
}));
