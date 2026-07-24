import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  AuthorizeBodySchema,
  AuthorizeResponseSchema,
  type AuthorizeBody,
  type AuthorizeResponse,
} from "@/features/oauth/schemas";

export const authorize: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: AuthorizeBody; Reply: AuthorizeResponse }
> = {
  url: "/identity/oauth/authorize",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "OAuth authorize",
    description: "Start the OAuth authorization code flow",
    operationId: "authorize",
    body: AuthorizeBodySchema,
    response: {
      200: AuthorizeResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.body;
    const service = container.get<IOAuthService>(TYPES.OAuthService);

    const result = await service.authorize({
      clientId: input.clientId,
      redirectUri: input.redirectUri,
      responseType: input.responseType,
      scope: input.scope,
      state: input.state,
    });

    const response: AuthorizeResponse = {
      redirectTo: result.redirectTo,
    };

    return reply.send(response);
  },
};
