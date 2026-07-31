import { UnauthorizedError } from "@pine/common";
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import "./types";

export const requireAuth = (
  request: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  if (!request.user) throw new UnauthorizedError();

  return done();
};
