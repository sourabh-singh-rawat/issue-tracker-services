import type { HttpMethod } from "../../../constants";
import type { HttpRequest } from "./HttpRequest";
import type { HttpResponse } from "./HttpResponse";

export type HttpHandler = (request: HttpRequest) => Promise<HttpResponse>;

export type HttpRequestHook = (request: HttpRequest) => Promise<void> | void;

export type HttpHook = HttpRequestHook;

export type HttpRoute = {
  url: string;
  method: HttpMethod | HttpMethod[];
  handler: HttpHandler;
  schema?: object;
  hooks?: HttpHook[];
};
