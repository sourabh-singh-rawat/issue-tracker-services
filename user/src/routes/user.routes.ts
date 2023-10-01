import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/service-container";

export const userRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const userController = container.get("userController");
  const auth = { preHandler: [Auth.requireTokens, Auth.requireAuth] };

  fastify.post("/register", userController.registerUser);
  fastify.post("/verify-password", userController.verifyPassword);
  fastify.get("/me", auth, userController.getCurrentUser);

  done();
};
