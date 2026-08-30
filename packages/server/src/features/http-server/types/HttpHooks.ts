import type { HttpRequestHook } from "./HttpRoute";

export type HttpHooks = {
  onRequest?: HttpRequestHook[];
};
