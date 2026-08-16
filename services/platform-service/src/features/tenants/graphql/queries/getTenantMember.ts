import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantMemberObject } from "@/features/tenants/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenantMember: t.field({
    type: TenantMemberObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);
      return service.getById(args.id, ctx.user!.id);
    },
  }),
}));
