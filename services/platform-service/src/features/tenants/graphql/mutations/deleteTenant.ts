import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { ITenantService } from "@/features/tenants/services";

builder.mutationFields((t) => ({
  deleteTenant: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<ITenantService>(TYPES.TenantService);
      await service.deleteTenant(id, ctx.user!.id);
      return "Tenant deleted successfully.";
    },
  }),
}));
