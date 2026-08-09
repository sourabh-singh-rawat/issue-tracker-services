import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IMeService } from "@/features/me/services";
import { MeResponseSchema, type MeResponse } from "@/features/me/schemas";
import { InvalidCredentialError } from "@/integrations/identity";

export const me: HttpRoute = {
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
  handler: async (request) => {
    const sessionToken = request.cookies.session;

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

    return json(response);
  },
};
