import type { HttpResponse } from "../types";

export const redirect = (location: string, status = 302): HttpResponse => ({
  status,
  headers: { Location: location },
});
