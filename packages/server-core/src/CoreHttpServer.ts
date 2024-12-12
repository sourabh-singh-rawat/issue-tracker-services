import { fastifyApolloHandler } from "@as-integrations/fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { ErrorHandlerUtil, NotFoundError } from "@issue-tracker/common";
import { RouteOptions } from "fastify";
import {
  CookieOptions,
  CorsOptions,
  GraphqlOptions,
  HttpServer,
  HttpServerOptions,
} from "./interfaces";

export class CoreHttpServer implements HttpServer {
  constructor(private readonly options: HttpServerOptions) {}

  private cors(options: CorsOptions) {
    const server = this.options.server;
    if (!server) throw new NotFoundError("Server");

    server.register(cors, options);
  }

  private cookie(options: CookieOptions) {
    const {
      secret,
      httpOnly = false,
      sameSite = false,
      secure = false,
      path = "/",
    } = options;
    const { server } = this.options;

    server.register(cookie, {
      secret,
      parseOptions: { httpOnly, sameSite, secure, path },
    });
  }

  private errorHandler() {
    const { server } = this.options;

    server.setErrorHandler(ErrorHandlerUtil.handleError);
  }

  private routes(routes: RouteOptions[]) {
    const { server } = this.options;

    routes.map((route) => server.route(route));
  }

  private async startListening() {
    const { server, config } = this.options;
    const { host, port } = config;

    await server.ready();
    await server.listen({ host, port });
    this.options.logger?.info(
      `🚀 [HTTP] server started listening at ${this.options.config.host}:${this.options.config.port}`,
    );
  }

  private async graphql(options: GraphqlOptions) {
    const { apollo, path, createContext } = options;
    const { logger, server, config } = this.options;
    const { host, port } = config;

    await apollo.start();
    const url = `/api${path}`;

    server.route({
      url,
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });

    logger?.info(`🚀 [GraphQL] server is configured at ${host}:${port}${url}`);
  }

  async start() {
    const { cors, cookie, routes, graphql } = this.options;
    if (cors) this.cors(cors);
    if (cookie) this.cookie(cookie);
    if (routes) this.routes(routes);
    if (graphql) await this.graphql(graphql);

    this.errorHandler();
    await this.startListening();
  }

  async stop() {
    const server = this.options.server;
    if (!server) throw new NotFoundError("Server");

    await this.options.server.close();
  }
}
