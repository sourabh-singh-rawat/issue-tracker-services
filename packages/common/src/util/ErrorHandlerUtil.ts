import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ResponseError, StandardError } from "../constants/errors";

export class ErrorHandlerUtil {
  static serialize(error: unknown): {
    statusCode: number;
    body: { errors: [{ message: string; field?: string }] };
  } {
    if (error instanceof ResponseError) {
      return { statusCode: error.statusCode, body: error.serializeError() };
    }

    if (error instanceof StandardError) {
      return {
        statusCode: error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
        body: error.serializeError(),
      };
    }

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: { errors: [{ message: "something went wrong" }] },
    };
  }

  static handleError(error: unknown, _request: FastifyRequest, reply: FastifyReply) {
    const { statusCode, body } = ErrorHandlerUtil.serialize(error);
    return reply.status(statusCode).send(body);
  }
}
