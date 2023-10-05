import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { serviceContainer } from "../app/service-container";

export const userRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const userController = serviceContainer.get("userController");
  const auth = { preHandler: [Auth.requireTokens, Auth.requireAuth] };

  fastify.post("/register", userController.registerUser);
  fastify.post("/verify-password", userController.verifyPassword);
  fastify.post("/default-workspace", auth, userController.setDefaultWorkspace);
  fastify.get("/me", auth, userController.getCurrentUser);

  done();
};
