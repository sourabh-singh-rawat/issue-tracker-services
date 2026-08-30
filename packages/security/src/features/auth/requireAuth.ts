import { UnauthorizedError } from "@pine/common";
import type { HttpHook } from "@pine/server";

export const requireAuth: HttpHook = (request) => {
  if (!request.identity) throw new UnauthorizedError();
};
