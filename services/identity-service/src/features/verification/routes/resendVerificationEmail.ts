import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IVerificationService } from "@/features/verification/services";
import {
  ResendVerificationEmailBodySchema,
  ResendVerificationEmailResponseSchema,
  type ResendVerificationEmailBody,
  type ResendVerificationEmailResponse,
} from "@/features/verification/schemas";

export const resendVerificationEmail: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: ResendVerificationEmailBody; Reply: ResendVerificationEmailResponse }
> = {
  url: "/identity/resendVerificationEmail",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Resend verification email",
    description:
      "Request a new email verification code. Always returns success to avoid revealing whether the email is registered.",
    operationId: "resendVerificationEmail",
    body: ResendVerificationEmailBodySchema,
    response: {
      200: ResendVerificationEmailResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IVerificationService>(TYPES.VerificationService);

    await service.resendVerificationEmail({
      email: req.body.email,
    });

    const response: ResendVerificationEmailResponse = {
      message: "If an account exists for that email, a verification email has been sent.",
    };

    return reply.send(response);
  },
};
