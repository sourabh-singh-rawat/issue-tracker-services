import { Environment } from "@pine/common";
import type { HttpMethod } from "../../constants";

export interface HttpConfigOptions {
  port: number;
  host: string;
  environment: Environment;
  version: number;
}

export type CorsOrigin = string | string[];

export interface CorsOptions {
  credentials?: boolean;
  origin?: CorsOrigin;
}

export interface CookieOptions {
  secret: string;
  path?: string;
  httpOnly?: boolean;
  sameSite?: boolean;
  secure?: boolean;
}

export interface HttpRequest {
  method: HttpMethod;
  url: string;
  headers: Record<string, string | undefined>;
  body: unknown;
}

export interface HttpResponse {
  status: number;
  headers?: Record<string, string>;
  body?: unknown;
}

export type HttpHandler = (request: HttpRequest) => Promise<HttpResponse>;

export interface HttpRoute {
  url: string;
  method: HttpMethod | HttpMethod[];
  handler: HttpHandler;
}

export interface HttpServerOptions {
  config: HttpConfigOptions;
  cors?: CorsOptions;
  cookie?: CookieOptions;
  routes?: HttpRoute[];
}

export interface IHttpServer {
  start(): Promise<void>;
  stop(): Promise<void>;
}
