import Type from "typebox";
import type { IGraphQLServer } from "../../graphql-server/IGraphQLServer";
import type { HttpHooks } from "../types/HttpHooks";
import type { HttpRoute } from "../types/HttpRoute";
import { CookieOptionsSchema } from "./CookieOptionsSchema";
import { CorsOptionsSchema } from "./CorsOptionsSchema";
import { HttpConfigOptionsSchema } from "./HttpConfigOptionsSchema";
import { MultipartOptionsSchema } from "./MultipartOptionsSchema";
import { OpenApiOptionsSchema } from "./OpenApiOptionsSchema";

export const HttpServerOptionsSchema = Type.Object(
  {
    config: HttpConfigOptionsSchema,
    cors: Type.Optional(CorsOptionsSchema),
    cookie: Type.Optional(CookieOptionsSchema),
    openapi: Type.Optional(OpenApiOptionsSchema),
    multipart: Type.Optional(Type.Union([MultipartOptionsSchema, Type.Boolean()])),
    graphql: Type.Optional(Type.Unsafe<IGraphQLServer>(Type.Unknown())),
    routes: Type.Optional(Type.Unsafe<HttpRoute[]>(Type.Array(Type.Unknown()))),
    hooks: Type.Optional(Type.Unsafe<HttpHooks>(Type.Unknown())),
  },
  { additionalProperties: false },
);

export type HttpServerOptions = Type.Static<typeof HttpServerOptionsSchema>;
