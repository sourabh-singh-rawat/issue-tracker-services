import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { RegisteredServices } from "..";

export const issueRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/issues",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          operationId: "createIssue",
          summary: "Create a new issue",
          description: "Create a new issue",
          body: {
            type: "object",
            properties: {
              name: { type: "string", minLength: 1 },
              projectId: { type: "string" },
              status: { type: "string" },
              priority: { type: "string" },
              reporter: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"],
              },
              assignees: {
                type: "array",
                items: {
                  type: "object",
                  properties: { id: { type: "string" } },
                  required: ["id"],
                },
              },
              resolution: { type: "boolean" },
              dueDate: { type: "string" },
              id: { type: "string" },
              description: { type: "string" },
            },
          },
          response: {
            201: {
              description: "Issue created successfully",
              type: "string",
            },
            400: {
              description: "Bad request",
              type: "object",
              properties: {
                errors: { $ref: "errorSchema#" },
              },
              required: ["errors"],
            },
          },
        },
      },
      controller.createIssue,
    );

    fastify.get(
      "/issues",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Gets a list of issues",
          description: "Gets a list of issues",
          operationId: "getIssueList",
          querystring: {
            type: "object",
            properties: {
              page: { type: "string", default: 0 },
              pageSize: { type: "string" },
              sortBy: { type: "string" },
              sortOrder: { type: "string" },
              projectId: { type: "string" },
            },
          },
        },
      },
      controller.getIssueList,
    );

    fastify.get(
      "/issues/priority",
      {
        preHandler,
        schema: {
          summary: "Get issue priority list",
          operationId: "getIssuePriorityList",
          response: {
            200: {
              description: "Get issue priority list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      rows: { type: "array", items: { type: "string" } },
                      rowCount: { type: "string" },
                    },
                    required: ["rows", "rowCount"],
                  },
                },
              },
            },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "errorSchema#",
                  },
                },
              },
            },
          },
        },
      },
      controller.getIssuePriorityList,
    );

    fastify.get(
      "/issues/status",
      {
        preHandler,
        schema: {
          operationId: "getIssueStatusList",
          response: {
            200: {
              description: "Get issues status list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      rows: { type: "array", items: { type: "string" } },
                      rowCount: { type: "number" },
                    },
                    required: ["rows", "rowCount"],
                  },
                },
              },
            },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "errorSchema#",
                  },
                },
              },
            },
          },
        },
      },
      controller.getIssueStatusList,
    );

    fastify.get(
      "/issues/:id",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Gets a Issue",
          params: { type: "object", properties: { id: { type: "string" } } },
          operationId: "getIssue",
          response: {
            200: {
              description: "Returns the issue if it exists",
              type: "object",
              properties: {
                createdAt: { type: "string", format: "date", maxLength: 0 },
                createdById: { type: "string" },
                deletedAt: { type: "string", format: "date", maxLength: 0 },
                description: { type: "string" },
                dueDate: { type: "string", format: "date", maxLength: 0 },
                id: { type: "string" },
                name: { type: "string" },
                priority: { type: "string" },
                projectId: { type: "string" },
                project: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                  },
                  required: ["id", "name"],
                },
                reporterId: { type: "string" },
                resolution: { type: "boolean" },
                status: { type: "string" },
                updatedAt: { type: "string", format: "date", maxLength: 0 },
              },
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getIssue,
    );

    fastify.patch(
      "/issues/:id",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Update issue",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          operationId: "updateIssue",
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
              priority: { type: "string" },
              resolution: { type: "boolean" },
              projectId: { type: "string" },
              assignees: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                  },
                  required: ["id", "name"],
                },
              },
              reporterId: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                },
              },
              dueDate: {
                type: "string",
                format: "date",
              },
            },
          },
          response: {
            200: {
              type: "object",
              description: "Update the issue",
            },
          },
        },
      },
      controller.updateIssue,
    );

    fastify.patch(
      "/issues/:id/status",
      {
        preHandler,
        schema: {
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          operationId: "updateIssueStatus",
          body: {
            type: "object",
            properties: {
              status: { type: "string" },
            },
          },
          response: {
            200: {
              type: "string",
              description: "Update issue status successfully",
            },
            400: {
              type: "object",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.updateIssueStatus,
    );

    fastify.patch(
      "/issues/:id/resolution",
      {
        preHandler,
        schema: {
          tags: ["issue"],
          summary: "Update issue resolution",
          description: "Update issue resolution",
          operationId: "updateIssueResolution",
          params: {
            type: "object",
            properties: { id: { type: "string" } },
          },
          body: {
            type: "object",
            properties: {
              resolution: { type: "boolean" },
            },
          },
          response: {
            200: {
              type: "string",
              description: "Update issue resolution successfully",
            },
            400: {
              type: "object",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.updateIssueResolution,
    );

    done();
  };
};
