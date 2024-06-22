import { ErrorHandlerUtil } from "@issue-tracker/common";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import fastify, { FastifyInstance, FastifyPluginCallback } from "fastify";
import { AppLogger } from "../logger";

interface FastifyServerOptions {
  port?: number;
  routes?: { prefix: string; route: FastifyPluginCallback }[];
  cookie?: { secret: string };
  logger?: AppLogger;
}

export class FastifyServer {
  readonly instance: FastifyInstance;
  private readonly SERVER_PORT = 4000;
  private readonly SERVER_HOST = "0.0.0.0";
  private port: number;
  private readonly cookie?: { secret?: string };
  private readonly routes?: { prefix: string; route: FastifyPluginCallback }[];
  private readonly logger?: AppLogger;

  constructor(options: FastifyServerOptions) {
    this.instance = fastify();
    this.port = options?.port || this.SERVER_PORT;
    this.cookie = options?.cookie;
    this.routes = options?.routes;
    this.logger = options?.logger;
  }

  private setCors(opts: FastifyCorsOptions) {
    this.instance.register(cors, opts);
  }

  private setCookie(opts: FastifyCookieOptions) {
    this.instance.register(cookie, opts);
  }

  private setErrorHandler() {
    this.instance.setErrorHandler(ErrorHandlerUtil.handleError);
  }

  private setRoutes() {
    this.routes?.forEach(({ route, prefix }) => {
      this.instance.register(route, { prefix });
    });
  }

  private startServer() {
    this.instance.listen({ host: this.SERVER_HOST, port: this.port });
  }

  init() {
    this.setCors({ credentials: true, origin: "http://localhost:3000" });
    this.setCookie({ secret: this.cookie?.secret });
    this.setErrorHandler();
    this.setRoutes();
    this.startServer();
    this.logger?.info(
      `🚀 Server started on port ${this.SERVER_HOST}:${this.SERVER_PORT}`,
    );
  }
}
