import { ApolloServer } from "@apollo/server";
import { Environment } from "@issue-tracker/common";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";
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

export interface CorsOptions {
  credentials?: boolean;
  origin?: string;
}

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

export interface HttpServerOptions {
  server: FastifyInstance;
  config: ServerConfigurationOptions;
  graphql: GraphqlOptions;
  cors?: CorsOptions;
  cookie?: CookieOptions;
  routes?: RouteOptions[];
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
