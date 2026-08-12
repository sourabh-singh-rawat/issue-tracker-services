import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { UpdateTenantMemberInput } from "@/features/tenantMembers/graphql/inputs/UpdateTenantMemberInput";
import { TenantMemberObject } from "@/features/tenantMembers/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenantMembers/services";

builder.mutationFields((t) => ({
  updateTenantMember: t.field({
    type: TenantMemberObject,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateTenantMemberInput, required: true }),
    },
    resolve: async (_root, { id, input }, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);

      return service.updateTenantMember(
        id,
        {
          expiresAt: input.expiresAt ?? undefined,
          reason: input.reason ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
