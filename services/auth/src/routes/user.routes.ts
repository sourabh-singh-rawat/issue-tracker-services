import { Auth } from "@issue-tracker/security";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const userRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("userController");
    const { requireTokens, setCurrentUser, requireAuth, requireNoAuth } = Auth;

    fastify.route({
      method: "POST",
      url: "/users/register",
      preHandler: [requireNoAuth],
      handler: controller.registerUser,
      schema: {
        summary: "Register a new user",
        operationId: "registerUser",
        description:
          "Register a new user with email, password and display name",
        tags: ["user"],
        querystring: {
          type: "object",
          properties: { inviteToken: { type: "string" } },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
            displayName: { type: "string" },
          },
          required: ["email", "password", "displayName"],
        },
        response: {
          200: {},
          401: {
            type: "string",
            description: "Unauthorized",
          },
        },
      },
    });

    fastify.route({
      method: "GET",
      url: "/users/me",
      preHandler: [requireTokens, setCurrentUser, requireAuth],
      handler: controller.getCurrentUser,
      schema: {
        operationId: "getCurrentUser",
        description: "Get the current user details if logged in",
        tags: ["identity"],
        summary: "Get current user",
        response: {
          200: {
            type: "object",
            properties: {
              userId: { type: "string" },
              displayName: { type: "string" },
              email: { $ref: "emailSchema#" },
              emailVerificationStatus: { type: "string" },
              createdAt: { type: "string" },
            },
          },
          401: {
            type: "string",
            description: "Unauthorized",
          },
        },
      },
    });

    fastify.route({
      method: "GET",
      url: "/users/:id/confirm",
      handler: controller.verifyEmail,
      schema: {
        operationId: "verifyEmail",
        summary: "Verify user email",
        description: "Verify user email",
        tags: ["users"],
        querystring: {
          type: "object",
          properties: {
            confirmationEmail: { type: "string" },
          },
          required: ["confirmationEmail"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: {
          200: {},
          401: {
            type: "string",
            description: "Unauthorized",
          },
        },
      },
    });

    done();
  };
};
