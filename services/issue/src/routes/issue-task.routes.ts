import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { RegisteredServices } from "..";

export const issueTaskRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueTaskController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const auth: RouteShorthandOptions = {
      preHandler: [requireTokens, setCurrentUser, requireAuth],
    };

    fastify.post("/:id/tasks", auth, controller.createIssueTask);
    fastify.get("/tasks", auth, controller.getTaskList);
    fastify.get("/:id/tasks", auth, controller.getIssueTaskList);
    fastify.get("/:id/tasks/:taskId", auth, controller.getIssueTask);
    fastify.patch("/:id/tasks/:taskId", auth, controller.updateIssueTask);
    fastify.delete("/:id/tasks/:taskId", auth, controller.deleteIssueTask);

    done();
  };
};
