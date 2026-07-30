import { ForbiddenError } from "@pine/common";
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import "./types";

export const requireNoAuth = (
  request: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  if (request.user) {
    throw new ForbiddenError("Registration not allowed for authenticated users.");
  }

  return done();
};
