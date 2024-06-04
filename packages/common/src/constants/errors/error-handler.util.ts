import { StatusCodes } from "http-status-codes";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ResponseError } from "./http";

export class ErrorHandler {
  static handleError(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    console.log("-----BEGIN COMMON ERROR-----", error);
    console.log("-----END COMMON ERROR-----");
    if (error instanceof ResponseError) {
      return reply.status(error.statusCode).send(error.serializeError());
    }

    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ errors: [{ message: "something went wrong" }] });
  }
}
