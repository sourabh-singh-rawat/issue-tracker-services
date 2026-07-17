import { JwtToken, hasUserIdentity } from "@pine/security";
import { GraphQLContext } from "@pine/graphql-core";
import { ApolloFastifyContextFunction } from "@as-integrations/fastify";

export type IssuesContext = GraphQLContext;

export const createContext: ApolloFastifyContextFunction<any> = async (
  req,
  rep,
) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    try {
      const token = await JwtToken.verify(
        accessToken,
        process.env.JWT_SECRET!,
      );
      if (hasUserIdentity(token)) {
        return {
          req,
          rep,
          user: { email: token.email, userId: token.userId },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { req, rep };
};
