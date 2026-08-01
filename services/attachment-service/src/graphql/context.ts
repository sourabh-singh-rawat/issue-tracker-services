import { JwtToken, hasUserIdentity } from "@pine/security";
import { GraphQLContext } from "@pine/graphql-core";
import { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import { env } from "@/bootstrap/env";

export type AttachmentContext = GraphQLContext;

export const createContext: ApolloFastifyContextFunction<any> = async (req, rep) => {
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
    }
  }

  return { req, rep };
};
