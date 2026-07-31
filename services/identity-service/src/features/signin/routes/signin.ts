import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ISignInService } from "@/features/signin/services";
import {
  SignInBodySchema,
  SignInQuerySchema,
  SignInResponseSchema,
  type SignInBody,
  type SignInQuery,
  type SignInResponse,
} from "@/features/signin/schemas";
import { env } from "@/bootstrap/env";

export const signin: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: SignInBody; Querystring: SignInQuery; Reply: SignInResponse }
> = {
  url: "/identity/signin",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Sign in with email and password",
    description:
      "Authenticate a user with email and password via the identity provider. Sets the session cookie. When a login_challenge is present, returns redirectTo for the OAuth provider.",
    operationId: "signInWithEmailAndPassword",
    body: SignInBodySchema,
    querystring: SignInQuerySchema,
    response: {
      200: SignInResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.body;
    const service = container.get<ISignInService>(TYPES.SignInService);
    const result = await service.signInWithEmailAndPassword({
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

    const response: SignInResponse = {
      data: {
        identity: {
          id: result.identity.id,
          email: result.identity.email,
          emailVerified: result.identity.emailVerified,
        },
        ...(result.redirectTo ? { redirectTo: result.redirectTo } : {}),
      },
    };

    return reply.status(200).send(response);
  },
};
