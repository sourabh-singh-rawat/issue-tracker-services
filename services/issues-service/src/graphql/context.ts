import type { GraphQLContext, HttpRequest } from "@pine/server";

export type IssuesContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<IssuesContext> => ({
  headers: request.headers,
  ...(request.identity ? { identity: request.identity } : {}),
});
