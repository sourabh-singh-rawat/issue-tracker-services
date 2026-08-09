import { builder } from "@pine/server";
import type { ClientDetails } from "@/features/clients/services/IClientService";

export const ClientObject = builder.objectRef<ClientDetails>("ClientObject");

ClientObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    redirectUris: t.exposeStringList("redirectUris"),
    scopes: t.exposeStringList("scopes"),
    grantTypes: t.exposeStringList("grantTypes"),
  }),
});
