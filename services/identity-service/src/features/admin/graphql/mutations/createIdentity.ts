import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin/services";
import { CreateIdentityInput } from "@/features/admin/graphql/inputs/CreateIdentityInput";
import { IdentityObject } from "@/features/admin/graphql/objects/IdentityObject";

builder.mutationFields((t) => ({
  createIdentity: t.field({
    type: IdentityObject,
    args: {
      input: t.arg({ type: CreateIdentityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IAdminService>(TYPES.AdminService);

      return service.createIdentity({
        email: input.email,
        username: input.username,
        password: input.password,
        emailVerified: input.emailVerified,
        firstName: input.firstName,
        middleName: input.middleName ?? undefined,
        lastName: input.lastName ?? undefined,
      });
    },
  }),
}));
