import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { TenantMemberObject } from "@/features/tenants/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenants/services";

builder.queryFields((t) => ({
  getTenantMembers: t.field({
    type: [TenantMemberObject],
    args: {
      tenantId: t.arg.string({ required: true }),
      relation: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);
      return service.list(
        {
          tenantId: args.tenantId,
          relation: args.relation ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
