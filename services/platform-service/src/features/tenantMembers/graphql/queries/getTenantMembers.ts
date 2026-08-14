import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantMemberObject } from "@/features/tenantMembers/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenantMembers/services";

builder.queryFields((t) => ({
  getTenantMembers: t.field({
    type: [TenantMemberObject],
    args: {
      tenantId: t.arg.string({ required: true }),
      roleId: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);
      return service.listTenantMembers(
        {
          tenantId: args.tenantId,
          roleId: args.roleId ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
