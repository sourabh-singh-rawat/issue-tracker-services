import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SchemaBuilder from "@pothos/core";
import { UnauthorizedError } from "@pine/common";
import type { HttpIdentity } from "../http-server/types";
import type { GraphQLContext } from "./context";

type SchemaTypes = {
  Context: GraphQLContext;
  AuthScopes: {
    identityRequired: boolean;
  };
  AuthContexts: {
    identityRequired: GraphQLContext & {
      identity: HttpIdentity;
    };
  };
  Scalars: {
    DateTimeISO: { Input: Date; Output: Date };
    EmailAddress: { Input: string; Output: string };
    UUID: { Input: string; Output: string };
  };
};

export const builder: InstanceType<typeof SchemaBuilder<SchemaTypes>> =
  new SchemaBuilder<SchemaTypes>({
    plugins: [ScopeAuthPlugin],
    scopeAuth: {
      authScopes: async (context) => ({ identityRequired: Boolean(context.identity?.id) }),
      unauthorizedError: () => new UnauthorizedError("No active session"),
    },
  });

builder.queryType({});
builder.mutationType({});
