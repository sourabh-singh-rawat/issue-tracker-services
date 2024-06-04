import { ResponseError } from "../constants/errors";
import { StatusCodes } from "http-status-codes";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export class ErrorHandlerUtil {
  static handleError(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    console.log("-----BEGIN COMMON ERROR-----");
    console.error(error);
    console.log("-----END COMMON ERROR-----");
    if (error instanceof ResponseError) {
      return reply.status(error.statusCode).send(error.serializeError());
    }

    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ errors: [{ message: "something went wrong" }] });
  }
}
