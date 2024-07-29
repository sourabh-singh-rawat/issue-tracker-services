import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { RegisteredServices } from "..";

export const issueTaskRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueTaskController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/issues/:id/tasks",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          operationId: "createIssueTask",
          summary: "Create a new issue task",
          description: "Create a new issue task",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          body: {
            type: "object",
            properties: {
              description: { type: "string" },
              completed: { type: "boolean", default: false },
              dueDate: { type: "string", format: "date" },
            },
            required: ["description"],
          },
          response: {
            201: {
              type: "string",
              description: "Issue task created successfully",
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.createIssueTask,
    );
    fastify.get(
      "/issues/tasks",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Get all tasks in an issue",
          description: "Gets all tasks in an issue",
          operationId: "getIssueTaskList",
          response: {
            200: {
              description: "Issue task created successfully",
              type: "object",
              properties: {
                row: { type: "array" },
                rowCount: { type: "number" },
              },
              required: ["row", "rowCount"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getTaskList,
    );
    fastify.get(
      "/issues/:id/tasks/:taskId",
      { preHandler, schema: {} },
      controller.getIssueTask,
    );
    fastify.patch(
      "/issues/:id/tasks/:taskId",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Update an issue task",
          description: "Update an issue task",
          operationId: "updateIssueTask",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
              taskId: { type: "string" },
            },
          },
          body: {
            type: "object",
            properties: {
              description: { type: "string" },
              completed: { type: "boolean" },
              dueDate: { type: "string", format: "date" },
            },
            required: ["description"],
          },
          response: {
            201: {
              type: "string",
              description: "Issue task created successfully",
            },
            400: { description: "Bad request", $ref: "errorSchema#" },
          },
        },
      },
      controller.updateIssueTask,
    );
    fastify.delete(
      "/issues/:id/tasks/:taskId",
      { preHandler },
      controller.deleteIssueTask,
    );

    done();
  };
};
