import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  TokenBodySchema,
  TokenResponseSchema,
  type TokenBody,
  type TokenResponse,
} from "@/features/oauth/schemas";
import { env } from "@/bootstrap/env";

export const token: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: TokenBody; Reply: TokenResponse }
> = {
  url: "/identity/oauth/token",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "OAuth token",
    description:
      "Exchange an authorization code for access (and optional refresh/id) tokens and set them as HTTP-only cookies",
    operationId: "exchangeToken",
    body: TokenBodySchema,
    response: {
      200: TokenResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.exchangeToken({
      grantType: req.body.grant_type,
      code: req.body.code,
      clientId: req.body.client_id,
      redirectUri: req.body.redirect_uri,
      codeVerifier: req.body.code_verifier,
    });

    const tokenCookieOptions = {
      httpOnly: true,
      path: "/",
      sameSite: "lax" as const,
      secure: env.NODE_ENV === "production",
    };

    const accessExpires =
      typeof result.expiresIn === "number"
        ? new Date(Date.now() + result.expiresIn * 1000)
        : undefined;

    reply.setCookie("accessToken", result.accessToken, {
      ...tokenCookieOptions,
      ...(accessExpires ? { expires: accessExpires } : {}),
    });

    if (result.refreshToken) {
      reply.setCookie("refreshToken", result.refreshToken, tokenCookieOptions);
    }

    if (result.idToken) {
      reply.setCookie("idToken", result.idToken, {
        ...tokenCookieOptions,
        ...(accessExpires ? { expires: accessExpires } : {}),
      });
    }

    const response: TokenResponse = {
      message: "Tokens issued successfully.",
    };

    return reply.send(response);
  },
};
