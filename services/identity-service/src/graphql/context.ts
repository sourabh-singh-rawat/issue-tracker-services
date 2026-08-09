import type { HttpRequest } from "@pine/server";
import { JwtToken, hasUserIdentity } from "@pine/security";
import type { GraphQLContext } from "@pine/server";
import { env } from "@/bootstrap/env";

export type AuthContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<AuthContext> => {
  const accessToken = request.cookies.accessToken;

  if (accessToken) {
    try {
      const token = await JwtToken.verify(accessToken, env.JWT_SECRET);
      if (hasUserIdentity(token)) {
        return {
          cookies: request.cookies,
          headers: request.headers,
          user: { id: token.userId, authMethod: "access_token" },
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    cookies: request.cookies,
    headers: request.headers,
  };
};
