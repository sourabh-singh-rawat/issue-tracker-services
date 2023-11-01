import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { serviceContainer } from "../app/service-container";

export const identityRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: unknown,
  done: () => void,
) => {
  const controller = serviceContainer.get("identityController");
  const { requireTokens, requireNoAuth } = Auth;
  const noAuth: RouteShorthandOptions = { preHandler: [requireNoAuth] };
  const auth: RouteShorthandOptions = { preHandler: [requireTokens] };

  fastify.post("/generate-tokens", noAuth, controller.generateTokens);
  fastify.post("/refresh-tokens", auth, controller.refreshTokens);
  fastify.post("/revoke-tokens", auth, controller.revokeTokens);

  done();
};
