import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ISessionService } from "@/features/session/services";
import { SessionResponseSchema, type SessionResponse } from "@/features/session/schemas";
import { InvalidCredentialError } from "@/integrations/identity";

const BEARER_PREFIX = /^Bearer\s+/i;

function extractBearerToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) {
    return null;
  }
  const token = authorizationHeader.replace(BEARER_PREFIX, "").trim();
  return token.length > 0 ? token : null;
}

export const getTokenSession: HttpRoute = {
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
  handler: async (request) => {
    const accessToken = extractBearerToken(request.headers.authorization);

    if (!accessToken) {
      throw new InvalidCredentialError("No access token");
    }

    const service = container.get<ISessionService>(TYPES.SessionService);
    const identity = await service.getSessionFromAccessToken(accessToken);

    const response: SessionResponse = {
      identity: {
        id: identity.id,
        ...(identity.email ? { email: identity.email } : {}),
        ...(identity.emailVerified !== undefined ? { emailVerified: identity.emailVerified } : {}),
      },
    };

    return json(response);
  },
};
