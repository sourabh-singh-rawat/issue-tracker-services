import type { HttpRequest } from "@pine/server";
import type { GraphQLContext } from "@pine/server";

export type AuthContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<AuthContext> => ({
  cookies: request.cookies,
  headers: request.headers,
  ...(request.user ? { user: request.user } : {}),
});
