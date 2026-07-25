import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  AuthorizeQuerySchema,
  AuthorizeResponseSchema,
  type AuthorizeQuery,
  type AuthorizeResponse,
} from "@/features/oauth/schemas";

export const authorize: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Querystring: AuthorizeQuery; Reply: AuthorizeResponse }
> = {
  url: "/identity/oauth/authorize",
  method: "GET",
  schema: {
    tags: ["oauth"],
    summary: "OAuth authorize",
    description: "Start the OAuth authorization code flow",
    operationId: "authorize",
    querystring: AuthorizeQuerySchema,
    response: {
      200: AuthorizeResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.query;
    const service = container.get<IOAuthService>(TYPES.OAuthService);

    const result = await service.authorize({
      clientId: input.clientId,
      redirectUri: input.redirectUri,
      responseType: input.responseType,
      scope: input.scope,
      state: input.state,
      codeChallenge: input.codeChallenge,
      codeChallengeMethod: input.codeChallengeMethod,
      nonce: input.nonce,
    });

    const response: AuthorizeResponse = {
      redirectTo: result.redirectTo,
    };

    return reply.send(response);
  },
};
