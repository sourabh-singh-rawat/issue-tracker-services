import type {
  ApolloServerOptions,
  ApolloServerPlugin,
  BaseContext,
  CSRFPreventionOptions,
} from "@apollo/server";
import type { GraphQLFormattedError, GraphQLSchema } from "graphql";
import type { HttpRequest } from "../http-server/types/HttpRequest";
import type { HttpResponse } from "../http-server/types/HttpResponse";

export type IGraphQLServer = {
  readonly path: string;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  handleRequest: (request: HttpRequest) => Promise<HttpResponse>;
};

export type GraphQLServerOptions<TContext extends BaseContext = BaseContext> = {
  path?: string;
  schema?: GraphQLSchema;
  gateway?: ApolloServerOptions<TContext>["gateway"];
  context?: (request: HttpRequest) => Promise<TContext> | TContext;
  plugins?: ApolloServerPlugin<TContext>[];
  introspection?: boolean;
  csrfPrevention?: boolean | CSRFPreventionOptions;
  formatError?: (formattedError: GraphQLFormattedError, error: unknown) => GraphQLFormattedError;
  includeStacktraceInErrorResponses?: boolean;
  allowBatchedHttpRequests?: boolean;
};

export type ApolloGraphQLServerOptions<TContext extends BaseContext = BaseContext> =
  GraphQLServerOptions<TContext> & {
    context: (request: HttpRequest) => Promise<TContext> | TContext;
  };
