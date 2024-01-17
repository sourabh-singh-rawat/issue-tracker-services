import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/containers/awilix.container";

export const issueTaskRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
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
