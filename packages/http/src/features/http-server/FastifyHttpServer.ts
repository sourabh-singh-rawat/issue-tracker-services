import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import "@fastify/swagger";
import { ErrorHandlerUtil } from "@pine/common";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { isHttpMethod } from "../../constants";
import {
  CookieOptions,
  CorsOptions,
  HttpRequest,
  HttpRoute,
  HttpServerOptions,
  IHttpServer,
} from "./IHttpServer";

export class FastifyHttpServer implements IHttpServer {
  constructor(
    private readonly server: FastifyInstance,
    private readonly options: HttpServerOptions,
  ) {}

  async start() {
    const { cors, cookie, routes, config } = this.options;
    if (cors) this.cors(cors);
    if (cookie) this.cookie(cookie);
    if (routes) this.routes(routes);

    this.errorHandler();

    const { host, port } = config;
    await this.server.ready();
    await this.server.listen({ host, port });
  }

  async stop() {
    await this.server.close();
  }

  private cors(options: CorsOptions) {
    this.server.register(cors, options);
  }

  private cookie(options: CookieOptions) {
    const { secret, httpOnly = false, sameSite = false, secure = false, path = "/" } = options;

    this.server.register(cookie, {
      secret,
      parseOptions: { httpOnly, sameSite, secure, path },
    });
  }

  private errorHandler() {
    this.server.setErrorHandler((error, request, reply) =>
      ErrorHandlerUtil.handleError(error, request, reply),
    );
  }

  private routes(routes: HttpRoute[]) {
    for (const route of routes) {
      this.server.route({
        url: route.url,
        method: route.method,
        handler: async (request, reply) => {
          const response = await route.handler(this.toHttpRequest(request));

          if (response.headers) {
            for (const [key, value] of Object.entries(response.headers)) {
              reply.header(key, value);
            }
          }

          return reply.status(response.status).send(response.body);
        },
      });
    }
  }

  private toHttpRequest(request: FastifyRequest): HttpRequest {
    const headers: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(request.headers)) {
      headers[key] = Array.isArray(value) ? value[0] : value;
    }

    if (!isHttpMethod(request.method)) {
      throw new Error(`Unsupported HTTP method: ${request.method}`);
    }

    return {
      method: request.method,
      url: request.url,
      headers,
      body: request.body,
    };
  }
}
