import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/container.config";

export const userRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error | undefined) => void,
) => {
  const userController = container.get("userController");
  const auth = { preHandler: [Auth.requireTokens, Auth.requireAuth] };

  fastify.post("/signup", userController.create);
  fastify.post("/login", userController.login);
  fastify.post("/refresh", userController.refresh);
  fastify.get("/users/me", auth, userController.getCurrentUser);
  fastify.patch("/users/:id/email", auth, userController.updateEmail);
  // fastify.patch("/users/:id/password", auth, userController.updatePassword);

  next();
};
