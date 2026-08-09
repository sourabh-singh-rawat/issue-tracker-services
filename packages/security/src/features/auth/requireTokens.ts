import { BadRequestError } from "@pine/common";
import type { HttpHook } from "@pine/server";

export const requireTokens: HttpHook = (request) => {
  if (!request.cookies.accessToken) {
    throw new BadRequestError("Bad request!");
  }
};
