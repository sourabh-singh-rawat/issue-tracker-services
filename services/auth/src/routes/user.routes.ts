import { Auth } from "@issue-tracker/security";
import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const userRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("userController");
    const { requireTokens, setCurrentUser, requireAuth, requireNoAuth } = Auth;
    const noAuth: RouteShorthandOptions = { preHandler: [requireNoAuth] };
    const auth: RouteShorthandOptions = {
      preHandler: [requireTokens, setCurrentUser, requireAuth],
    };

    fastify.post("/register", noAuth, controller.registerUser);
    fastify.post("/verify-password", controller.verifyPassword);
    fastify.get("/me", auth, controller.getCurrentUser);
    fastify.get("/:id/confirm", controller.verifyEmail);

    done();
  };
};
