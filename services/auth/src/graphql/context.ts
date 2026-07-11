import { JwtToken, hasUserIdentity } from "@issue-tracker/security";
import { GraphQLContext } from "@issue-tracker/graphql-core";
import { ApolloFastifyContextFunction } from "@as-integrations/fastify";

export type AuthContext = GraphQLContext;

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
      throw error;
    }
  }

  return { req, rep };
};
