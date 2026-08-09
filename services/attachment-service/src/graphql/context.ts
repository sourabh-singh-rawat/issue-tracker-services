import type { HttpRequest } from "@pine/server";
import type { GraphQLContext } from "@pine/server";
import { JwtToken, hasUserIdentity } from "@pine/security";
import { env } from "@/bootstrap/env";

export type AttachmentContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<AttachmentContext> => {
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
    }
  }

  return {
    cookies: request.cookies,
    headers: request.headers,
  };
};
