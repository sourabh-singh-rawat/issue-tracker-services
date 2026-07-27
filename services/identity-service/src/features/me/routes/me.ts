import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IMeService } from "@/features/me/services";
import { MeResponseSchema, type MeResponse } from "@/features/me/schemas";
import { InvalidCredentialError } from "@/integrations/identity";

export const me: RouteOptions<Server, IncomingMessage, ServerResponse, { Reply: MeResponse }> = {
  url: "/identity/me",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Get current authenticated user",
    description: "Return basic information about the current user by verifying the session cookie",
    operationId: "getCurrentUser",
    response: {
      200: MeResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const sessionToken = req.cookies.session;

    if (!sessionToken) {
      throw new InvalidCredentialError("No active session");
    }

    const service = container.get<IMeService>(TYPES.MeService);
    const identity = await service.getCurrentUser(sessionToken);

    const response: MeResponse = {
      identity: {
        id: identity.id,
        email: identity.email,
        emailVerified: identity.emailVerified,
      },
    };

    return reply.send(response);
  },
};
