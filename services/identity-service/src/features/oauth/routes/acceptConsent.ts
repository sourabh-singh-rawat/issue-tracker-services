import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  AcceptConsentBodySchema,
  ConsentActionResponseSchema,
  ConsentQuerySchema,
  type AcceptConsentBody,
  type ConsentActionResponse,
  type ConsentQuery,
} from "@/features/oauth/schemas";

export const acceptConsent: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: AcceptConsentBody; Querystring: ConsentQuery; Reply: ConsentActionResponse }
> = {
  url: "/identity/oauth/consent/accept",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "Accept OAuth consent",
    description: "Accept an OAuth consent challenge with granted scopes",
    operationId: "acceptConsentChallenge",
    querystring: ConsentQuerySchema,
    body: AcceptConsentBodySchema,
    response: {
      200: ConsentActionResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.acceptConsent({
      challenge: req.query.consent_challenge,
      grantScope: req.body.grantScope,
      remember: req.body.remember,
      rememberFor: req.body.rememberFor,
    });

    return reply.send(result);
  },
};
