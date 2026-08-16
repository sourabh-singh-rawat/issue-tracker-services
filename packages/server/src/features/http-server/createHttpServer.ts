import { FastifyHttpServer } from "./FastifyHttpServer";
import type { IHttpServer } from "./IHttpServer";
import type { HttpServerOptions } from "./schemas/HttpServerOptionsSchema";

export const createHttpServer = (options: HttpServerOptions): IHttpServer =>
  new FastifyHttpServer(options);
