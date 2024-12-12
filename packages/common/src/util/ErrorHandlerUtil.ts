import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../constants/errors";

export class ErrorHandlerUtil {
  static handleError(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    if (error instanceof ResponseError) {
      return reply.status(error.statusCode).send(error.serializeError());
    }

    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ errors: [{ message: error.message }] });
  }
}
