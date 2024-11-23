import { Environment, ErrorHandlerUtil } from "@issue-tracker/common";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { AppLogger } from "../logger";

interface ServerConfigurationOptions {
  port: number;
  host: string;
  environment: Environment;
  version: number;
}

interface RouteOptions {
  route: FastifyPluginCallback;
  prefix?: string;
}

interface SecurityOptions {
  cors?: FastifyCorsOptions;
  cookie?: FastifyCookieOptions;
}

interface ServerOptions {
  fastify: FastifyInstance;
  configuration: ServerConfigurationOptions;
  security?: SecurityOptions;
  routes?: RouteOptions[];
  cookie?: { secret: string };
  logger?: AppLogger;
}

export class FastifyServer {
  readonly instance: FastifyInstance;
  private configuration: ServerConfigurationOptions;
  private readonly routes?: RouteOptions[];
  private readonly logger?: AppLogger;
  private security?: SecurityOptions;

  constructor(options: ServerOptions) {
    this.instance = options.fastify;
    this.routes = options?.routes;
    this.logger = options?.logger;
    this.configuration = options?.configuration;
    this.security = options?.security;
  }

  private setCors = (opts?: FastifyCorsOptions) => {
    this.instance.register(cors, opts);
  };

  private setCookie = (opts: FastifyCookieOptions) => {
    this.instance.register(cookie, {
      ...opts,
      parseOptions: {
        path: "/",
        httpOnly: false,
        sameSite: false,
        secure: false,
      },
    });
  };

  private setErrorHandler = () => {
    this.instance.setErrorHandler(ErrorHandlerUtil.handleError);
  };

  private setRoutes = () => {
    this.routes?.forEach(({ route }) => {
      const { version } = this.configuration;

      this.instance.register(route, { prefix: `/api/v${version}` });
    });
  };

  private startListening = async () => {
    const { host, port } = this.configuration;
    await this.instance.ready();
    this.instance.listen({ host, port });
  };

  private setupSwagger = () => {};

  init() {
    this.setCors(this.security?.cors);
    this.setCookie({ secret: this.security?.cookie?.secret });
    this.setErrorHandler();
    this.setRoutes();
    this.startListening();
    this.logger?.info(
      `🚀 Server started on port ${this.configuration.host}:${this.configuration.port}`,
    );
  }
}
