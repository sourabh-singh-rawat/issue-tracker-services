import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../constants/errors";

export class ErrorHandlerUtil {
  static handleError(error: unknown, _request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ResponseError) {
      return reply.status(error.statusCode).send(error.serializeError());
    }

    const message = error instanceof Error ? error.message : "something went wrong";

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [{ message }] });
  }
}
