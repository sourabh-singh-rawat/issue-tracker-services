import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreateTenantMemberInput } from "@/features/tenants/graphql/inputs/CreateTenantMemberInput";
import { TenantMemberObject } from "@/features/tenants/graphql/objects/TenantMemberObject";
import type { ITenantMemberService } from "@/features/tenants/services";

builder.mutationFields((t) => ({
  createTenantMember: t.field({
    type: TenantMemberObject,
    args: {
      input: t.arg({ type: CreateTenantMemberInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<ITenantMemberService>(TYPES.TenantMemberService);

      return service.create(
        {
          tenantId: input.tenantId,
          relation: input.relation,
          identityId: input.identityId,
        },
        ctx.user!.id,
      );
    },
  }),
}));
