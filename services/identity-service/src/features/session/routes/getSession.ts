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

export const getSession: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Reply: SessionResponse }
> = {
  url: "/identity/getSession",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Resolve session identity",
    description:
      "Verify the session cookie against Ory Kratos (SDK FrontendApi.toSession) and return the authenticated identity. Used by other services via @pine/identity-client.",
    operationId: "getSessionIdentity",
    response: {
      200: SessionResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const sessionToken = req.cookies.session;

    if (!sessionToken) {
      throw new InvalidCredentialError("No active session");
    }

    const service = container.get<ISessionService>(TYPES.SessionService);
    const identity = await service.getSession(sessionToken);

    const response: SessionResponse = {
      identity: {
        id: identity.id,
        email: identity.email,
        emailVerified: identity.emailVerified,
      },
    };

    return reply.send(response);
  },
};
