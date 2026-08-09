import { FastifyHttpServer } from "./FastifyHttpServer";
import type { HttpServerOptions, IHttpServer } from "./types/IHttpServer";

export const createHttpServer = (options: HttpServerOptions): IHttpServer =>
  new FastifyHttpServer(options);
