import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/container.config";

export const identityRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const identityController = container.get("identityController");
  const auth = { preHandler: [Auth.requireTokens] };

  fastify.post("/generate-tokens", identityController.generateTokens);
  fastify.post("/refresh-tokens", auth, identityController.refreshTokens);

  done();
};
