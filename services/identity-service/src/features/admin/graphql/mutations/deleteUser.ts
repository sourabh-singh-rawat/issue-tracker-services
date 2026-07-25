import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin/services";
import { DeleteUserInput } from "@/features/admin/graphql/inputs/DeleteUserInput";

builder.mutationFields((t) => ({
  deleteUser: t.string({
    args: {
      input: t.arg({ type: DeleteUserInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IAdminService>(TYPES.AdminService);

      await service.deleteUser(input.userId);

      return "User deleted successfully.";
    },
  }),
}));
