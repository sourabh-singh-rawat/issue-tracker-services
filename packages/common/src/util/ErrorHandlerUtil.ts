import type {
  FastifyReply,
  FastifyRequest,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";
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

  static handleError<RawServer extends RawServerBase = RawServerDefault>(
    error: unknown,
    _request: FastifyRequest<RouteGenericInterface, RawServer>,
    reply: FastifyReply<RouteGenericInterface, RawServer>,
  ) {
    console.error(error);
    const { statusCode, body } = ErrorHandlerUtil.serialize(error);
    return reply.status(statusCode).send(body);
  }
}
