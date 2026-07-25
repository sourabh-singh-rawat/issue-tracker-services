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
    description: "Exchange an authorization code for access (and optional refresh/id) tokens",
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

    return reply.send(result);
  },
};
