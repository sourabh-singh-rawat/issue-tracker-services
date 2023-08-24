import { FastifyInstance } from "fastify";
import { container } from "../app";
import { UserController } from "../controllers/interfaces/user-controller.interface";

export const userRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error | undefined) => void,
) => {
  const userController = container.resolve<UserController>("userController");

  fastify.post("/signup", userController.create);
  fastify.patch("/users/:id/email", userController.updateEmail);
  fastify.patch("/users/:id/password", userController.updatePassword);
  // fastify.get("/users/:id", userController.update);
  // fastify.delete("/users/:id", userController.update);

  next();
};
