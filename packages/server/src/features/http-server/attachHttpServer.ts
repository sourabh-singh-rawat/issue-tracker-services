import type { FastifyInstance, RawServerBase } from "fastify";
import type { Http2SecureServer } from "node:http2";
import { FastifyHttpServer } from "./FastifyHttpServer";
import type { IHttpServer } from "./IHttpServer";
import type { HttpServerOptions } from "./schemas/HttpServerOptionsSchema";

export const attachHttpServer = <RawServer extends RawServerBase = Http2SecureServer>(
  server: FastifyInstance<RawServer>,
  options: HttpServerOptions,
): IHttpServer => new FastifyHttpServer(options, server);
