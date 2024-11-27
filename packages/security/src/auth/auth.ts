import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import "@fastify/cookie";
import { AccessToken, JwtToken } from "../crypto";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "@issue-tracker/common";

declare module "fastify" {
  interface FastifyRequest {
    user: AccessToken;
  }
}

export class Auth {
  static requireTokens = (
    request: FastifyRequest,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    if (!request.cookies.accessToken || !request.cookies.refreshToken) {
      throw new BadRequestError("Bad request!");
    }

    return done();
  };

  static setCurrentUser = (
    request: FastifyRequest,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    const accessToken = request.cookies.accessToken;
    if (accessToken) {
      try {
        request.user = JwtToken.verify(accessToken, process.env.JWT_SECRET!);
      } catch (error) {
        // ignore
      }
    }

    return done();
  };

  static requireAuth = (
    request: FastifyRequest,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    if (!request.user) throw new UnauthorizedError();

    return done();
  };

  static requireNoAuth = (
    request: FastifyRequest,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    if (request.user) {
      throw new ForbiddenError(
        "Registration not allowed for authenticated users.",
      );
    }

    return done();
  };
}
