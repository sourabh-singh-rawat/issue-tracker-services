import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantObject } from "@/features/tenants/graphql/objects/TenantObject";
import type { ITenantService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenant: t.field({
    type: TenantObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<ITenantService>(TYPES.TenantService);
      return service.getTenantById(id, ctx.user!.id);
    },
  }),
}));
