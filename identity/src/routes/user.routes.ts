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
  fastify.patch("/:id", userController.update);

  next();
};
