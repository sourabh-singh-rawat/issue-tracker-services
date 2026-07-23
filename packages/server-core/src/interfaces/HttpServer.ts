import { ApolloServer } from "@apollo/server";
import type { FastifyCorsOptions } from "@fastify/cors";
import { Environment } from "@pine/common";
import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { Logger } from "./Logger";

export interface AppContext {
  req: FastifyRequest;
  rep: FastifyReply;
  user: { email: string; userId: string };
}

export interface ServerConfigurationOptions {
  port: number;
  host: string;
  environment: Environment;
  version: number;
}

/**
 * CORS options for {@link CoreHttpServer}.
 * `origin` accepts a single value or an array (and other forms supported by @fastify/cors).
 */
export type CorsOptions = Pick<FastifyCorsOptions, "credentials" | "origin">;

export interface CookieOptions {
  secret: string;
  path?: string;
  httpOnly?: boolean;
  sameSite?: boolean;
  secure?: boolean;
}

export interface GraphqlOptions {
  path: string;
  apollo: ApolloServer;
  createContext: any;
}

/**
 * Route registration entry for {@link CoreHttpServer}.
 * Uses loose generics so routes can declare their own Body/Params types
 * without failing assignability into the shared routes array.
 */
export type HttpRouteOptions = RouteOptions<
  // Server/request/reply and route generic params are erased at the registry boundary.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

export interface HttpServerOptions {
  server: FastifyInstance;
  config: ServerConfigurationOptions;
  graphql: GraphqlOptions;
  cors?: CorsOptions;
  cookie?: CookieOptions;
  routes?: HttpRouteOptions[];
  logger?: Logger;
}

export interface HttpServer {
  /**
   * Start HTTP server
   */
  start(): Promise<void>;

  /**
   * Stop HTTP server
   */
  stop(): Promise<void>;
}
