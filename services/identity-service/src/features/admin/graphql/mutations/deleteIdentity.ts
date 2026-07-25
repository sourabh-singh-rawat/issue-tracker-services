import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin/services";
import { DeleteIdentityInput } from "@/features/admin/graphql/inputs/DeleteIdentityInput";

builder.mutationFields((t) => ({
  deleteIdentity: t.string({
    args: {
      input: t.arg({ type: DeleteIdentityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IAdminService>(TYPES.AdminService);

      await service.deleteIdentity(input.identityId);

      return "Identity deleted successfully.";
    },
  }),
}));
