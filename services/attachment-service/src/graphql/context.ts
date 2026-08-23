import type { HttpRequest } from "@pine/server";
import type { GraphQLContext } from "@pine/server";

export type AttachmentContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<AttachmentContext> => ({
  cookies: request.cookies,
  headers: request.headers,
  ...(request.user ? { user: request.user } : {}),
});
