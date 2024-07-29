import { AwilixDi } from "@issue-tracker/server-core";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { RegisteredServices } from "..";

export const projectActivityRoutes = (
  container: AwilixDi<RegisteredServices>,
) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("projectActivityController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.get(
      "/projects/:id/activities",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          summary: "Get project activities for a given project",
          description: "Get project activities for a given project",
          operationId: "getProjectActivityList",
          response: {
            200: {
              description: "Get project activities for a given project",
              type: "object",
              properties: {
                rows: { type: "array", items: { type: "string" } },
                rowCount: { type: "number" },
              },
              required: ["rows", "rowCount"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getProjectActivityList,
    );

    done();
  };
};
