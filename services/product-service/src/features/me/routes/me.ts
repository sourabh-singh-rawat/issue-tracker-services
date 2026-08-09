import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { hasUserIdentity, JwtToken } from "@pine/security";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidCredentialError } from "@/features/me/errors";
import type { MeResponse } from "@/features/me/schemas";
import { MeResponseSchema } from "@/features/me/schemas";
import type { IMeService } from "@/features/me/services";
import { env } from "@/bootstrap/env";

export const me: HttpRoute = {
  url: "/products/me",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Get current authenticated identity",
    description:
      "Return basic information about the current identity by verifying the access token cookie",
    operationId: "getCurrentProductUser",
    response: {
      200: MeResponseSchema,
    },
  },
  handler: async (request) => {
    const accessToken = request.cookies.accessToken;

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
      },
    };

    return json(response);
  },
};
