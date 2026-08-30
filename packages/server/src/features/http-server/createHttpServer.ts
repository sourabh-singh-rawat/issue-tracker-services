import fastify from "fastify";
import { FastifyHttpServer } from "./FastifyHttpServer";
import type { IHttpServer } from "./IHttpServer";
import type { HttpServerOptions } from "./schemas/HttpServerOptionsSchema";

export const createHttpServer = (options: HttpServerOptions): IHttpServer =>
  new FastifyHttpServer(
    options,
    options.https
      ? fastify({
          http2: true,
          https: { ...options.https, allowHTTP1: options.https.allowHTTP1 ?? true },
        })
      : fastify({ http2: true }),
  );
