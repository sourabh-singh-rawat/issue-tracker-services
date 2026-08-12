import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreateTenantMemberInput } from "@/features/tenantMembers/graphql/inputs/CreateTenantMemberInput";
import { TenantMemberObject } from "@/features/tenantMembers/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenantMembers/services";

builder.mutationFields((t) => ({
  createTenantMember: t.field({
    type: TenantMemberObject,
    args: {
      input: t.arg({ type: CreateTenantMemberInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);

      return service.createTenantMember(
        {
          tenantId: input.tenantId,
          roleId: input.roleId,
          identityId: input.identityId,
          expiresAt: input.expiresAt ?? undefined,
          reason: input.reason ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
