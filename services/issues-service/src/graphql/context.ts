import type { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import type { GraphQLContext } from "@pine/graphql-core";
import { authenticate } from "@pine/identity-client";

export type IssuesContext = GraphQLContext;

export const createContext: ApolloFastifyContextFunction<IssuesContext> = async (req, rep) => {
  await authenticate(req, rep);

  if (req.user) {
    return {
      req,
      rep,
      user: {
        id: req.user.id,
        email: req.user.email,
        authMethod: req.user.authMethod,
      },
    };
  }

  return { req, rep };
};
