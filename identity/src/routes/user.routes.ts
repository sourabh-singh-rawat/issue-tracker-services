import { FastifyInstance } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app";
import { UserController } from "../controllers/interfaces/user-controller.interface";

export const userRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error | undefined) => void,
) => {
  const userController = container.resolve<UserController>("userController");
  const auth = { preHandler: [Auth.requireTokens, Auth.requireAuth] };

  fastify.post("/signup", userController.create);
  fastify.post("/login", userController.login);
  fastify.post("/refresh", userController.refresh);
  fastify.get("/users/me", auth, userController.getCurrentUser);
  fastify.patch("/users/:id/email", auth, userController.updateEmail);
  // fastify.patch("/users/:id/password", auth, userController.updatePassword);

  next();
};
