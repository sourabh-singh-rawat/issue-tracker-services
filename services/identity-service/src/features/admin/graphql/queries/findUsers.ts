import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin/services";
import { UserObject } from "@/features/admin/graphql/objects/UserObject";

builder.queryFields((t) => ({
  findUsers: t.field({
    type: [UserObject],
    resolve: async () => {
      const service = container.get<IAdminService>(TYPES.AdminService);
      return service.findUsers();
    },
  }),
}));
