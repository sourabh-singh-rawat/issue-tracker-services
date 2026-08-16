import type { FastifyInstance } from "fastify";
import { FastifyHttpServer } from "./FastifyHttpServer";
import type { IHttpServer } from "./IHttpServer";
import type { HttpServerOptions } from "./schemas/HttpServerOptionsSchema";

export const attachHttpServer = (
  server: FastifyInstance,
  options: HttpServerOptions,
): IHttpServer => new FastifyHttpServer(options, server);
