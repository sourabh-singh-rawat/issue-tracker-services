import { UnauthorizedError } from "@pine/common";
import type { HttpIdentity } from "@pine/server";

export const requireIdentity = (target: { identity?: HttpIdentity }): HttpIdentity => {
  if (!target.identity) {
    throw new UnauthorizedError("No active session");
  }

  return target.identity;
};

export const requireIdentityId = (target: { identity?: HttpIdentity }): string => {
  return requireIdentity(target).id;
};
