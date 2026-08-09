import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { RoleObject } from "@/features/roles/graphql/objects/RoleObject";
import type { IRoleService } from "@/features/roles/services";

builder.queryFields((t) => ({
  getRole: t.field({
    type: RoleObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IRoleService>(TYPES.RoleService);
      return service.getRoleById(id);
    },
  }),
}));
