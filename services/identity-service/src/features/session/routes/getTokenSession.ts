import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ISessionService } from "@/features/session/services";
import {
  SessionResponseSchema,
  type SessionResponse,
} from "@/features/session/schemas";
import { InvalidCredentialError } from "@/integrations/identity";

const BEARER_PREFIX = /^Bearer\s+/i;

function extractBearerToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) {
    return null;
  }
  const token = authorizationHeader.replace(BEARER_PREFIX, "").trim();
  return token.length > 0 ? token : null;
}

export const getTokenSession: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Reply: SessionResponse }
> = {
  url: "/identity/getTokenSession",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Resolve identity from OAuth access token",
    description:
      "Introspect an OAuth provider access token (Authorization: Bearer) and return the authenticated identity. Used by other services via @pine/identity-client.",
    operationId: "getTokenSessionIdentity",
    security: [{ bearerAuth: [] }],
    response: {
      200: SessionResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const accessToken = extractBearerToken(req.headers.authorization);

    if (!accessToken) {
      throw new InvalidCredentialError("No access token");
    }

    const service = container.get<ISessionService>(TYPES.SessionService);
    const identity = await service.getSessionFromAccessToken(accessToken);

    const response: SessionResponse = {
      identity: {
        id: identity.id,
        ...(identity.email ? { email: identity.email } : {}),
        ...(identity.emailVerified !== undefined
          ? { emailVerified: identity.emailVerified }
          : {}),
      },
    };

    return reply.send(response);
  },
};
