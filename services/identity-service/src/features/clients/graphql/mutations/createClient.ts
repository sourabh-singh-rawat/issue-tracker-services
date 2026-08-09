import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateClientInput } from "@/features/clients/graphql/inputs/CreateClientInput";
import { ClientObject } from "@/features/clients/graphql/objects/ClientObject";
import type { IClientService } from "@/features/clients/services";

builder.mutationFields((t) => ({
  createClient: t.field({
    type: ClientObject,
    args: {
      input: t.arg({ type: CreateClientInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IClientService>(TYPES.ClientService);

      return service.createClient({
        name: input.name,
        redirectUris: input.redirectUris ?? undefined,
        scopes: input.scopes ?? undefined,
        grantTypes: input.grantTypes,
      });
    },
  }),
}));
