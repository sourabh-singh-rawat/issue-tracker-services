import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { TenantObject } from "@/features/tenants/graphql/objects/TenantObject";
import type { ITenantService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenants: t.field({
    type: [TenantObject],
    resolve: async (_root, _args, ctx) => {
      const service = getContainer().get<ITenantService>(TYPES.TenantService);
      return service.listTenants(ctx.user!.id);
    },
  }),
}));
