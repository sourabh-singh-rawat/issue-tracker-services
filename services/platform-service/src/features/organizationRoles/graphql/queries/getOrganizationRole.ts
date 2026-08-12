import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { OrganizationRoleObject } from "@/features/organizationRoles/graphql/objects/OrganizationRoleObject";
import type { IOrganizationRoleService } from "@/features/organizationRoles/services";

builder.queryFields((t) => ({
  getOrganizationRole: t.field({
    type: OrganizationRoleObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IOrganizationRoleService>(TYPES.OrganizationRoleService);
      return service.getOrganizationRoleById(args.id, ctx.user!.id);
    },
  }),
}));
