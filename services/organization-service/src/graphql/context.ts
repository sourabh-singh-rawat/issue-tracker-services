import type { HttpRequest } from "@pine/server";
import type { GraphQLContext } from "@pine/server";
import { authenticate } from "@pine/identity-client";

export type AuthContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<AuthContext> => {
  await authenticate(request);

  return {
    cookies: request.cookies,
    headers: request.headers,
    ...(request.user
      ? {
          user: {
            id: request.user.id,
            authMethod: request.user.authMethod,
          },
        }
      : {}),
  };
};
