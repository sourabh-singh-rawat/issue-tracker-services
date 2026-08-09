import type { GraphQLSchema } from "graphql";
import type { HttpRequest } from "../http-server/types/HttpRequest";
import type { HttpResponse } from "../http-server/types/HttpResponse";

export type IGraphQLServer = {
  readonly path: string;
  start(): Promise<void>;
  stop(): Promise<void>;
  handleRequest(request: HttpRequest): Promise<HttpResponse>;
};

export type GraphQLServerOptions<TContext extends object = object> = {
  path?: string;
  schema: GraphQLSchema;
  context?: (request: HttpRequest) => Promise<TContext> | TContext;
};
