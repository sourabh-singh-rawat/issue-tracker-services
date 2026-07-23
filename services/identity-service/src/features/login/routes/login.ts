import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ILoginService } from "@/features/login/services";
import {
  LoginBodySchema,
  LoginResponseSchema,
  type LoginBody,
  type LoginResponse,
} from "@/features/login/schemas";

export const login: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: LoginBody; Reply: LoginResponse }
> = {
  url: "/login",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Login with email and password",
    description: "Authenticate a user with email and password via the identity provider",
    operationId: "loginWithEmailAndPassword",
    body: LoginBodySchema,
    response: {
      200: LoginResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.body;
    const service = container.get<ILoginService>(TYPES.LoginService);
    const result = await service.loginWithEmailAndPassword(input.email, input.password);

    const response: LoginResponse = {
      identity: {
        id: result.identity.id,
        email: result.identity.email,
        emailVerified: result.identity.emailVerified,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      sessionId: result.sessionId,
      expiresAt: result.expiresAt?.toISOString(),
    };

    return reply.send(response);
  },
};
