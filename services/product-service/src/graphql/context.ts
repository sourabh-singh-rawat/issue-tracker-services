import type { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import type { GraphQLContext } from "@pine/graphql-core";
import { hasUserIdentity, JwtToken } from "@pine/security";
import { env } from "@/bootstrap/env";

export type AuthContext = GraphQLContext;

export const createContext: ApolloFastifyContextFunction<AuthContext> = async (req, rep) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    try {
      const token = await JwtToken.verify(accessToken, env.JWT_SECRET);
      if (hasUserIdentity(token)) {
        return {
          req,
          rep,
          user: { id: token.userId, authMethod: "access_token" },
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { req, rep };
};
