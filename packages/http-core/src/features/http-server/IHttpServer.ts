import type { ApolloServer, BaseContext } from "@apollo/server";
import type { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import type { FastifyCorsOptions } from "@fastify/cors";
import { Environment } from "@pine/common";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ILogger } from "../logger";

export interface AppContext {
  req: FastifyRequest;
  rep: FastifyReply;
  user?: { id: string; authMethod: "access_token" | "session" };
}

export interface ServerConfigurationOptions {
  port: number;
  host: string;
  environment: Environment;
  version: number;
}

/**
 * CORS options for {@link FastifyHttpServer}.
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

export interface GraphqlOptions<Context extends BaseContext = BaseContext> {
  path: string;
  apollo: ApolloServer<Context>;
  createContext: ApolloFastifyContextFunction<Context>;
}

/**
 * Route registration entry for {@link FastifyHttpServer}.
 * Matches the argument accepted by Fastify's `route` method.
 *
 * Feature routes with concrete Body/Params generics are not directly assignable
 * into a shared array (handler parameter variance). Widen them with
 * {@link asHttpRoute} at the feature boundary.
 */
export type HttpRouteOptions = Parameters<FastifyInstance["route"]>[0];

/**
 * Widen a feature-typed Fastify route so it can live in a shared routes array.
 */
export function asHttpRoute(route: object): HttpRouteOptions {
  return route as HttpRouteOptions;
}

export interface HttpServerOptions<Context extends BaseContext = BaseContext> {
  server: FastifyInstance;
  config: ServerConfigurationOptions;
  graphql?: GraphqlOptions<Context>;
  cors?: CorsOptions;
  cookie?: CookieOptions;
  routes?: HttpRouteOptions[];
  logger?: ILogger;
}

export interface IHttpServer {
  /**
   * Start HTTP server
   */
  start(): Promise<void>;

  /**
   * Stop HTTP server
   */
  stop(): Promise<void>;
}
