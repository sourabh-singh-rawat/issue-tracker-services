import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { ILogoutService } from "@/features/logout/services";
import { LogoutResponseSchema, type LogoutResponse } from "@/features/logout/schemas";
import { InvalidCredentialError } from "@/integrations/identity";

export const logout: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Reply: LogoutResponse }
> = {
  url: "/identity/logout",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Logout",
    description: "Invalidate the current session and clear the session cookie",
    operationId: "logout",
    response: {
      200: LogoutResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const sessionToken = req.cookies.session;

    if (!sessionToken) {
      throw new InvalidCredentialError("No active session");
    }

    const service = container.get<ILogoutService>(TYPES.LogoutService);
    await service.logout(sessionToken);

    reply.clearCookie("session", {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const response: LogoutResponse = {
      message: "Logged out successfully.",
    };

    return reply.send(response);
  },
};
