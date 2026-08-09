import type { FastifyInstance } from "fastify";
import { FastifyHttpServer } from "./FastifyHttpServer";
import type { HttpServerOptions, IHttpServer } from "./types/IHttpServer";

export const attachHttpServer = (
  server: FastifyInstance,
  options: HttpServerOptions,
): IHttpServer => new FastifyHttpServer(options, server);
