import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IRegistrationService } from "@/features/registration/services";
import {
  RegisterBodySchema,
  RegisterResponseSchema,
  type RegisterBody,
  type RegisterResponse,
} from "@/features/registration/schemas";

export const registerWithEmailAndPassword: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Body: RegisterBody; Reply: RegisterResponse }
> = {
  url: "/identity/registerWithEmailAndPassword",
  method: "POST",
  schema: {
    tags: ["auth"],
    summary: "Register with email and password",
    description: "Register a new user with email and password via the identity provider",
    operationId: "registerWithEmailAndPassword",
    body: RegisterBodySchema,
    response: {
      200: RegisterResponseSchema,
    },
  },
  handler: async (req, reply) => {
    const input = req.body;
    const service = container.get<IRegistrationService>(TYPES.RegistrationService);

    await service.register(input.email, input.username, input.password);

    const response: RegisterResponse = {
      message: "Your request has been received.",
    };

    return reply.send(response);
  },
};
