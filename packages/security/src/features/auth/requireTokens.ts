import { BadRequestError } from "@pine/common";
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import "@fastify/cookie";

export const requireTokens = (
  request: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  if (!request.cookies.accessToken) {
    throw new BadRequestError("Bad request!");
  }

  return done();
};
