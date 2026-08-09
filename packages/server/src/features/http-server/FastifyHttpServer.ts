import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import { ErrorHandlerUtil } from "@pine/common";
import fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { isHttpMethod } from "../../constants";
import type { IGraphQLServer } from "../graphql-server/IGraphQLServer";
import type {
  CookieOptions,
  CorsOptions,
  HttpClearCookie,
  HttpRequest,
  HttpResponse,
  HttpResponseCookie,
  HttpRoute,
  HttpServerOptions,
  HttpUploadedFile,
  IHttpServer,
  MultipartOptions,
  OpenApiOptions,
} from "./types";

export class FastifyHttpServer implements IHttpServer {
  private readonly server: FastifyInstance;
  private readonly options: HttpServerOptions;
  private openApiEnabled = false;
  private graphqlServer: IGraphQLServer | undefined;

  constructor(options: HttpServerOptions, server?: FastifyInstance) {
    this.options = options;
    this.server = server ?? fastify();
  }

  async start() {
    const { cors, cookie, multipart, openapi, routes, graphql, config } = this.options;

    if (cors) await this.registerCors(cors);
    if (cookie) await this.registerCookie(cookie);
    if (multipart) await this.registerMultipart(multipart);
    if (openapi) await this.registerOpenApi(openapi);
    if (routes) this.registerRoutes(routes);
    if (graphql) await this.registerGraphql(graphql);

    this.registerErrorHandler();

    const { host, port } = config;
    await this.server.ready();
    await this.server.listen({ host, port });
  }

  async stop() {
    if (this.graphqlServer) {
      await this.graphqlServer.stop();
      this.graphqlServer = undefined;
    }
    await this.server.close();
  }

  writeOpenApi(filePath: string): void {
    const document = this.getOpenApiDocument();
    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, JSON.stringify(document, null, 2));
  }

  getOpenApiDocument(): object {
    if (!this.openApiEnabled) {
      throw new Error("OpenAPI is not enabled. Pass openapi options to createHttpServer.");
    }
    return this.server.swagger({ yaml: false });
  }

  private async registerCors(options: CorsOptions) {
    await this.server.register(cors, options);
  }

  private async registerCookie(options: CookieOptions) {
    const {
      secret,
      httpOnly = false,
      sameSite = false,
      secure = false,
      path: cookiePath = "/",
    } = options;

    await this.server.register(cookie, {
      secret,
      parseOptions: { httpOnly, sameSite, secure, path: cookiePath },
    });
  }

  private async registerMultipart(options: MultipartOptions | boolean) {
    if (typeof options === "boolean") {
      if (options) {
        await this.server.register(multipart);
      }
      return;
    }

    await this.server.register(multipart, {
      limits: {
        ...(options.fileSize !== undefined ? { fileSize: options.fileSize } : {}),
        ...(options.files !== undefined ? { files: options.files } : {}),
        ...(options.fields !== undefined ? { fields: options.fields } : {}),
      },
    });
  }

  private async registerOpenApi(options: OpenApiOptions) {
    await this.server.register(swagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: options.info.title,
          version: options.info.version,
          description: options.info.description,
          license: options.info.license,
        },
        servers: options.servers,
        tags: options.tags,
        components:
          options.securitySchemes === undefined
            ? undefined
            : {
                securitySchemes: options.securitySchemes,
              },
      },
    });
    this.openApiEnabled = true;
  }

  private async registerGraphql(graphqlServer: IGraphQLServer) {
    await graphqlServer.start();
    this.graphqlServer = graphqlServer;

    this.server.route({
      url: graphqlServer.path,
      method: ["POST", "GET"],
      schema: { hide: true },
      handler: async (request, reply) => {
        const httpRequest = this.toHttpRequest(request);
        const response = await graphqlServer.handleRequest(httpRequest);
        return this.sendHttpResponse(reply, response);
      },
    });
  }

  private registerErrorHandler() {
    this.server.setErrorHandler((error, request, reply) =>
      ErrorHandlerUtil.handleError(error, request, reply),
    );
  }

  private registerRoutes(routes: HttpRoute[]) {
    for (const route of routes) {
      this.server.route({
        url: route.url,
        method: route.method,
        ...(route.schema !== undefined ? { schema: route.schema } : {}),
        handler: async (request, reply) => {
          const httpRequest = this.toHttpRequest(request);

          if (route.hooks) {
            for (const hook of route.hooks) {
              await hook(httpRequest);
            }
          }

          const response = await route.handler(httpRequest);
          return this.sendHttpResponse(reply, response);
        },
      });
    }
  }

  private toHttpRequest(request: FastifyRequest): HttpRequest {
    const headers: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(request.headers)) {
      headers[key] = Array.isArray(value) ? value[0] : value;
    }

    if (!isHttpMethod(request.method)) {
      throw new Error(`Unsupported HTTP method: ${request.method}`);
    }

    return {
      method: request.method,
      url: request.url,
      headers,
      query: this.toQueryRecord(request.query),
      params: this.toParamsRecord(request.params),
      cookies: this.toCookies(request),
      body: request.body,
      file: async (): Promise<HttpUploadedFile | undefined> => {
        if (typeof request.file !== "function") {
          return undefined;
        }
        const data = await request.file();
        if (!data) return undefined;

        return {
          fieldname: data.fieldname,
          filename: data.filename,
          mimetype: data.mimetype,
          encoding: data.encoding,
          toBuffer: () => data.toBuffer(),
        };
      },
    };
  }

  private async sendHttpResponse(reply: FastifyReply, response: HttpResponse) {
    if (response.headers) {
      for (const [key, value] of Object.entries(response.headers)) {
        reply.header(key, value);
      }
    }

    if (response.cookies) {
      for (const item of response.cookies) {
        this.setCookie(reply, item);
      }
    }

    if (response.clearCookies) {
      for (const item of response.clearCookies) {
        this.clearCookie(reply, item);
      }
    }

    return reply.status(response.status).send(response.body);
  }

  private setCookie(reply: FastifyReply, item: HttpResponseCookie) {
    const { name, value, ...options } = item;
    reply.setCookie(name, value, options);
  }

  private clearCookie(reply: FastifyReply, item: HttpClearCookie) {
    const { name, ...options } = item;
    reply.clearCookie(name, options);
  }

  private toCookies(request: FastifyRequest): Record<string, string | undefined> {
    const cookies = request.cookies;
    if (cookies === null || typeof cookies !== "object") {
      return {};
    }

    const result: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(cookies)) {
      if (value === undefined || typeof value === "string") {
        result[key] = value;
      }
    }
    return result;
  }

  private toQueryRecord(value: unknown): Record<string, string | string[] | undefined> {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return {};
    }

    const result: Record<string, string | string[] | undefined> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry === undefined || typeof entry === "string") {
        result[key] = entry;
        continue;
      }
      if (Array.isArray(entry) && entry.every((item) => typeof item === "string")) {
        result[key] = entry;
      }
    }
    return result;
  }

  private toParamsRecord(value: unknown): Record<string, string | undefined> {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return {};
    }

    const result: Record<string, string | undefined> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry === undefined || typeof entry === "string") result[key] = entry;
    }
    return result;
  }
}
