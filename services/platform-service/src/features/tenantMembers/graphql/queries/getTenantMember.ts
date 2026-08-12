import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantMemberObject } from "@/features/tenantMembers/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenantMembers/services";

builder.queryFields((t) => ({
  getTenantMember: t.field({
    type: TenantMemberObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);
      return service.getTenantMemberById(args.id, ctx.user!.id);
    },
  }),
}));
