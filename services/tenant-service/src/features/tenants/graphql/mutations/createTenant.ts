import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { CreateTenantInput } from "@/features/tenants/graphql/inputs/CreateTenantInput";
import { TenantObject } from "@/features/tenants/graphql/objects/TenantObject";
import type { ITenantService } from "@/features/tenants/services";

builder.mutationFields((t) => ({
  createTenant: t.field({
    type: TenantObject,
    args: {
      input: t.arg({ type: CreateTenantInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = getContainer().get<ITenantService>(TYPES.TenantService);

      return service.createTenant(
        {
          name: input.name,
          slug: input.slug,
          description: input.description ?? undefined,
          isActive: input.isActive ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
