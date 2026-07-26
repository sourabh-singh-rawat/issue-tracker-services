import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ILoginService } from "@/features/login/services";
import {
  LoginBodySchema,
  LoginQuerySchema,
  LoginResponseSchema,
  type LoginBody,
  type LoginQuery,
  type LoginResponse,
} from "@/features/login/schemas";
import { env } from "@/bootstrap/env";

export const login: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: LoginBody; Querystring: LoginQuery; Reply: LoginResponse }
> = {
  url: "/identity/login",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Login with email and password",
    description: "Authenticate a user with email and password via the identity provider",
    operationId: "loginWithEmailAndPassword",
    body: LoginBodySchema,
    querystring: LoginQuerySchema,
    response: {
      200: LoginResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.body;
    const service = container.get<ILoginService>(TYPES.LoginService);
    const result = await service.loginWithEmailAndPassword({
      email: input.email,
      password: input.password,
      loginChallenge: req.query.login_challenge,
    });

    reply.setCookie("session", result.sessionToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      expires: result.expiresAt,
    });

    const response: LoginResponse = {
      identity: {
        id: result.identity.id,
        email: result.identity.email,
        emailVerified: result.identity.emailVerified,
      },
      ...(result.redirectTo ? { redirectTo: result.redirectTo } : {}),
    };

    return reply.send(response);
  },
};
