import type { IGraphQLServer } from "../../graphql-server/IGraphQLServer";
import type { CookieOptions } from "./CookieOptions";
import type { CorsOptions } from "./CorsOptions";
import type { HttpConfigOptions } from "./HttpConfigOptions";
import type { HttpRoute } from "./HttpRoute";
import type { MultipartOptions } from "./MultipartOptions";
import type { OpenApiOptions } from "./OpenApiOptions";

export type IHttpServer = {
  start(): Promise<void>;
  stop(): Promise<void>;
  writeOpenApi(filePath: string): void;
  getOpenApiDocument(): object;
};

export type HttpServerOptions = {
  config: HttpConfigOptions;
  cors?: CorsOptions;
  cookie?: CookieOptions;
  openapi?: OpenApiOptions;
  multipart?: MultipartOptions | boolean;
  graphql?: IGraphQLServer;
  routes?: HttpRoute[];
};
