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
    currentUser: AccessToken;
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
    console.log(accessToken);
    if (accessToken) {
      try {
        request.currentUser = JwtToken.verify(
          accessToken,
          process.env.JWT_SECRET!,
        );
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
    if (!request.currentUser) throw new UnauthorizedError();

    return done();
  };

  static requireNoAuth = (
    request: FastifyRequest,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    if (request.currentUser) {
      throw new ForbiddenError(
        "Registration not allowed for authenticated users.",
      );
    }

    return done();
  };
}
