import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { serviceContainer } from "../app/service-container";

export const identityRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const identityController = serviceContainer.get("identityController");
  const auth = { preHandler: [Auth.requireTokens] };

  fastify.post("/generate-tokens", identityController.generateTokens);
  fastify.post("/refresh-tokens", auth, identityController.refreshTokens);

  done();
};
