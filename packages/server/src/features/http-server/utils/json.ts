import type { HttpResponse } from "../types";

export const json = (body: unknown, status = 200): HttpResponse => ({
  status,
  body,
});
