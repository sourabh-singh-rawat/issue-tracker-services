import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IClientService } from "@/features/clients/services";

builder.mutationFields((t) => ({
  deleteClient: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IClientService>(TYPES.ClientService);
      await service.deleteClientById(id);
      return "Client deleted successfully.";
    },
  }),
}));
