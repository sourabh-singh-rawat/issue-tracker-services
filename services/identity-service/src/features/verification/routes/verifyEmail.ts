import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IVerificationService } from "@/features/verification/services";
import {
  VerifyEmailQuerySchema,
  VerifyEmailResponseSchema,
  type VerifyEmailQuery,
  type VerifyEmailResponse,
} from "@/features/verification/schemas";

export const verifyEmail: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Querystring: VerifyEmailQuery; Reply: VerifyEmailResponse }
> = {
  url: "/identity/verifyEmail",
  method: "GET",
  schema: {
    tags: ["auth"],
    summary: "Verify email with Kratos code",
    description:
      "Complete email verification using the one-time code from the Kratos verification email",
    operationId: "verifyEmail",
    querystring: VerifyEmailQuerySchema,
    response: {
      200: VerifyEmailResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const service = container.get<IVerificationService>(TYPES.VerificationService);

    await service.verifyEmail({
      flowId: req.query.flow,
      code: req.query.code,
    });

    const response: VerifyEmailResponse = {
      message: "Email verified successfully.",
    };

    return reply.send(response);
  },
};
