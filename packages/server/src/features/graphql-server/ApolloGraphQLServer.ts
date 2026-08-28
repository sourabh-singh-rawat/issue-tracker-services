import { ApolloServer, type BaseContext, HeaderMap } from "@apollo/server";
import { Readable } from "node:stream";
import type { HttpRequest } from "../http-server/types/HttpRequest";
import type { GraphQLServerOptions, IGraphQLServer } from "./IGraphQLServer";

export class ApolloGraphQLServer<
  TContext extends BaseContext = BaseContext,
> implements IGraphQLServer {
  readonly path: string;

  private readonly options: GraphQLServerOptions<TContext>;
  private apollo: ApolloServer<TContext> | undefined;

  constructor(options: GraphQLServerOptions<TContext>) {
    this.options = options;
    this.path = options.path ?? "/graphql";
  }

  async start() {
    if (this.apollo) {
      return;
    }

    const {
      schema,
      gateway,
      plugins,
      introspection,
      csrfPrevention,
      formatError,
      includeStacktraceInErrorResponses,
      allowBatchedHttpRequests,
    } = this.options;

    const apollo = gateway
      ? new ApolloServer<TContext>({
          gateway,
          plugins,
          introspection,
          csrfPrevention,
          formatError,
          includeStacktraceInErrorResponses,
          allowBatchedHttpRequests,
        })
      : schema
        ? new ApolloServer<TContext>({
            schema,
            plugins,
            introspection,
            csrfPrevention,
            formatError,
            includeStacktraceInErrorResponses,
            allowBatchedHttpRequests,
          })
        : undefined;

    if (!apollo) {
      throw new Error("Either schema or gateway must be provided to createGraphQLServer");
    }

    await apollo.start();
    this.apollo = apollo;
  }

  async stop() {
    if (!this.apollo) {
      return;
    }

    await this.apollo.stop();
    this.apollo = undefined;
  }

  async handleRequest(request: HttpRequest) {
    if (!this.apollo) {
      throw new Error("GraphQL server has not been started");
    }

    const contextFactory = this.options.context;
    const response = await this.apollo.executeHTTPGraphQLRequest({
      httpGraphQLRequest: this.toHttpGraphQLRequest(request),
      context: async () => {
        if (contextFactory) {
          return contextFactory(request);
        }
        return this.createEmptyContext();
      },
    });

    const headers: Record<string, string> = {};
    for (const [key, value] of response.headers) {
      if (value) {
        headers[key] = value;
      }
    }

    const status = response.status ?? 200;

    if (response.body.kind === "complete") {
      return {
        status,
        headers,
        body: response.body.string,
      };
    }

    return {
      status,
      headers,
      body: Readable.from(response.body.asyncIterator),
    };
  }

  private createEmptyContext(): TContext {
    const empty: Record<string, unknown> = {};
    if (this.isEmptyContext(empty)) {
      return empty;
    }
    throw new Error("Context factory is required when custom context type is used");
  }

  private isEmptyContext(value: Record<string, unknown>): value is TContext {
    return typeof value === "object" && value !== null;
  }

  private toHttpGraphQLRequest(request: HttpRequest) {
    const headers = new HeaderMap();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value) {
        headers.set(key, value);
      }
    }

    const queryIndex = request.url.indexOf("?");
    const search = queryIndex === -1 ? "" : request.url.slice(queryIndex);

    return {
      method: request.method.toUpperCase(),
      headers,
      search,
      body: request.body,
    };
  }
}
