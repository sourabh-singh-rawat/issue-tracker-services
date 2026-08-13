import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { ITenantMemberService } from "@/features/tenantMembers/services";

builder.mutationFields((t) => ({
  deleteTenantMember: t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);
      await service.deleteTenantMember(args.id, ctx.user!.id);
      return true;
    },
  }),
}));
