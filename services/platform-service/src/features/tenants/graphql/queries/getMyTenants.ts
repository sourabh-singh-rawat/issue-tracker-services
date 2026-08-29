import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantObject } from "@/features/tenants/graphql/objects/TenantObject";
import type { ITenantService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getMyTenants: t.field({
    type: [TenantObject],
    authScopes: {
      identityRequired: true,
    },
    resolve: async (_root, _args, ctx) => {
      const service = container.get<ITenantService>(TYPES.TenantService);
      return service.listMyTenants(requireIdentityId(ctx));
    },
  }),
}));
