import { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../errors";
import { AccessToken, JwtToken } from "../crypto";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: AccessToken;
  }
}

export class Auth {
  static requireTokens = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.cookies.accessToken || !request.cookies.refreshToken) {
      throw new BadRequestError("Bad request!");
    }

    return done();
  };

  static setCurrentUser = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const accessToken = request.cookies.accessToken;
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
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.currentUser) {
      throw new UnauthorizedError();
    }

    return done();
  };

  static requireNoAuth = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (request.currentUser) {
      throw new ForbiddenError(
        "Registration not allowed for authenticated users.",
      );
    }

    return done();
  };
}
