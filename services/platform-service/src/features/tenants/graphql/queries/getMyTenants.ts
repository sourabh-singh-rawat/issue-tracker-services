import { UnauthorizedError } from "@pine/common";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantObject } from "@/features/tenants/graphql/objects/TenantObject";
import type { ITenantService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getMyTenants: t.field({
    type: [TenantObject],
    resolve: async (_root, _args, ctx) => {
      if (!ctx.identity) {
        throw new UnauthorizedError();
      }

      const service = container.get<ITenantService>(TYPES.TenantService);
      return service.listMyTenants(ctx.identity.id);
    },
  }),
}));
