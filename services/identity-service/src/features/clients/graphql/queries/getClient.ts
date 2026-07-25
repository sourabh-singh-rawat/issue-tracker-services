import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { ClientObject } from "@/features/clients/graphql/objects/ClientObject";
import type { IClientService } from "@/features/clients/services";

builder.queryFields((t) => ({
  getClient: t.field({
    type: ClientObject,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IClientService>(TYPES.ClientService);
      return service.getClientById(id);
    },
  }),
}));
