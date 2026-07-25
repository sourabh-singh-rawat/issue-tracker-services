import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  ConsentActionResponseSchema,
  ConsentQuerySchema,
  RejectConsentBodySchema,
  type ConsentActionResponse,
  type ConsentQuery,
  type RejectConsentBody,
} from "@/features/oauth/schemas";

export const rejectConsent: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: RejectConsentBody; Querystring: ConsentQuery; Reply: ConsentActionResponse }
> = {
  url: "/identity/oauth/consent/reject",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "Reject OAuth consent",
    description: "Reject an OAuth consent challenge when the user denies access",
    operationId: "rejectConsentChallenge",
    querystring: ConsentQuerySchema,
    body: RejectConsentBodySchema,
    response: {
      200: ConsentActionResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.rejectConsent({
      challenge: req.query.consent_challenge,
      error: req.body.error,
      errorDescription: req.body.errorDescription,
    });

    return reply.send(result);
  },
};
