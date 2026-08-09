import { ForbiddenError } from "@pine/common";
import type { HttpHook } from "@pine/server";

export const requireNoAuth: HttpHook = (request) => {
  if (request.user) {
    throw new ForbiddenError("Registration not allowed for authenticated users.");
  }
};
