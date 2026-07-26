import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { hasUserIdentity, JwtToken } from "@pine/security";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidCredentialError } from "@/features/me/errors";
import type { MeResponse } from "@/features/me/schemas";
import { MeResponseSchema } from "@/features/me/schemas";
import type { IMeService } from "@/features/me/services";
import { env } from "@/bootstrap/env";

export const me: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Reply: MeResponse }
> = {
  url: "/inventory/me",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Get current authenticated identity",
    description:
      "Return basic information about the current identity by verifying the access token cookie",
    operationId: "getCurrentInventoryUser",
    response: {
      200: MeResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new InvalidCredentialError("No active session");
    }

    let identityId: string;
    try {
      const payload = await JwtToken.verify(accessToken, env.JWT_SECRET);
      if (!hasUserIdentity(payload)) {
        throw new InvalidCredentialError("Invalid access token");
      }
      identityId = payload.userId;
    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        throw error;
      }
      throw new InvalidCredentialError("Invalid access token");
    }

    const service = container.get<IMeService>(TYPES.MeService);
    const identity = await service.getCurrentUser(identityId);

    const response: MeResponse = {
      identity: {
        id: identity.id,
        email: identity.email,
      },
    };

    return reply.send(response);
  },
};
