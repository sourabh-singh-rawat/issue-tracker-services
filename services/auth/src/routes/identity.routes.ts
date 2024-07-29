import { Auth } from "@issue-tracker/security";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const identityRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    const controller = container.get("identityController");
    const { requireTokens, requireNoAuth, requireAuth } = Auth;

    fastify.route({
      method: "POST",
      url: "/identity/generate-tokens",
      preHandler: [requireNoAuth],
      handler: controller.generateTokens,
      schema: {
        operationId: "generateTokens",
        tags: ["identity"],
        summary: "Generate Tokens",
        description: "Validate credentials and generate tokens",
        headers: {
          type: "object",
          properties: { Cookie: { type: "string" } },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          required: ["email", "password"],
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
      method: "POST",
      url: "/identity/refresh-tokens",
      preHandler: [requireTokens],
      handler: controller.refreshTokens,
      schema: {
        operationId: "refreshTokens",
        summary: "Create new accessToken",
        description:
          "If refresh token is valid, generate new access and refresh tokens",
        headers: {
          type: "object",
          properties: { Cookie: { type: "string" } },
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
      method: "POST",
      url: "/identity/revoke-tokens",
      preHandler: [requireAuth],
      handler: controller.revokeTokens,
      schema: {
        operationId: "revokeTokens",
        summary: "Revoke Tokens",
        description: "Revoke all the tokens",
        headers: {
          type: "object",
          properties: { Cookie: { type: "string" } },
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
