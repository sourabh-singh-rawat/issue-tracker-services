import { Auth } from "@issue-tracker/security";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const projectActivityRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) => {
    const controller = container.get("projectActivityController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;

    fastify.get(
      "/:id",
      {
        preHandler: [requireTokens, setCurrentUser, requireAuth],
      },
      controller.getProjectActivityList,
    );

    done();
  };
