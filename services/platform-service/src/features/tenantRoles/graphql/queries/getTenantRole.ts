import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantRoleObject } from "@/features/tenantRoles/graphql/objects/TenantRoleObject";
import type { ITenantRoleService } from "@/features/tenantRoles/services";

builder.queryFields((t) => ({
  getTenantRole: t.field({
    type: TenantRoleObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantRoleService>(TYPES.TenantRoleService);
      return service.getTenantRoleById(args.id, ctx.user!.id);
    },
  }),
}));
