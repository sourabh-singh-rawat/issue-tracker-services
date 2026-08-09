import { ApolloServer, HeaderMap } from "@apollo/server";
import { Readable } from "node:stream";
import type { HttpRequest } from "../http-server/types/HttpRequest";
import type { GraphQLServerOptions, IGraphQLServer } from "./IGraphQLServer";

export class ApolloGraphQLServer implements IGraphQLServer {
  readonly path: string;

  private readonly options: GraphQLServerOptions;
  private apollo: ApolloServer | undefined;

  constructor(options: GraphQLServerOptions) {
    this.options = options;
    this.path = options.path ?? "/graphql";
  }

  async start() {
    if (this.apollo) {
      return;
    }

    const apollo = new ApolloServer({ schema: this.options.schema });
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
        return {};
      },
    });

    const headers: Record<string, string> = {};
    for (const [key, value] of response.headers) {
      headers[key] = value;
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
