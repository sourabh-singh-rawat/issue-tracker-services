import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  ConsentQuerySchema,
  ConsentResponseSchema,
  type ConsentQuery,
  type ConsentResponse,
} from "@/features/oauth/schemas";

export const consent: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Querystring: ConsentQuery; Reply: ConsentResponse }
> = {
  url: "/identity/oauth/consent",
  method: "GET",
  schema: {
    tags: ["oauth"],
    summary: "OAuth consent challenge",
    description: "Load OAuth consent challenge details by consent_challenge",
    operationId: "getConsentChallenge",
    querystring: ConsentQuerySchema,
    response: {
      200: ConsentResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.getConsentChallenge(req.query.consent_challenge);

    return reply.send(result);
  },
};
