import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { awilixContainer } from "../app/containers/awilix.container";

export const userRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
  const controller = awilixContainer.get("userController");
  const { requireTokens, setCurrentUser, requireAuth, requireNoAuth } = Auth;
  const noAuth: RouteShorthandOptions = { preHandler: [requireNoAuth] };
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/register", noAuth, controller.registerUser);
  fastify.post("/verify-password", controller.verifyPassword);
  fastify.post("/default-workspace", auth, controller.setDefaultWorkspace);
  fastify.get("/me", auth, controller.getCurrentUser);
  fastify.get("/:id/confirm", controller.verifyEmail);

  done();
};
