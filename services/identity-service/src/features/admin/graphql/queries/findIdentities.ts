import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin/services";
import { IdentityObject } from "@/features/admin/graphql/objects/IdentityObject";

builder.queryFields((t) => ({
  findIdentities: t.field({
    type: [IdentityObject],
    resolve: async () => {
      const service = container.get<IAdminService>(TYPES.AdminService);
      return service.findIdentities();
    },
  }),
}));
