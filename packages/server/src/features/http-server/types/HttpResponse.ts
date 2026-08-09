export type HttpSameSite = boolean | "strict" | "lax" | "none";

export type HttpResponseCookie = {
  name: string;
  value: string;
  path?: string;
  httpOnly?: boolean;
  sameSite?: HttpSameSite;
  secure?: boolean;
  expires?: Date;
  maxAge?: number;
};

export type HttpClearCookie = {
  name: string;
  path?: string;
  sameSite?: HttpSameSite;
  secure?: boolean;
};

export type HttpResponse = {
  status: number;
  headers?: Record<string, string>;
  body?: unknown;
  cookies?: HttpResponseCookie[];
  clearCookies?: HttpClearCookie[];
};
