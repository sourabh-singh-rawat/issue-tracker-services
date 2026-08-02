import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { RoleObject } from "@/features/roles/graphql/objects/RoleObject";
import type { IRoleService } from "@/features/roles/services";

builder.queryFields((t) => ({
  getRoles: t.field({
    type: [RoleObject],
    resolve: async () => {
      const service = container.get<IRoleService>(TYPES.RoleService);
      return service.getRoles();
    },
  }),
}));
