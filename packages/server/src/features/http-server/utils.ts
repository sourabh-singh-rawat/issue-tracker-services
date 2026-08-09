import type { HttpResponse } from "./types/HttpResponse";

export const redirect = (location: string, status = 302): HttpResponse => ({
  status,
  headers: { Location: location },
});

export const json = (body: unknown, status = 200): HttpResponse => ({
  status,
  body,
});
