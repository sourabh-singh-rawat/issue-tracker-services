import { AwilixDi } from "@issue-tracker/server-core";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { RegisteredServices } from "..";

export const projectRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("projectController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/projects",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Create a new project",
          description: "Create a new project",
          operationId: "createProject",
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              startDate: { type: "string" },
              endDate: { type: "string" },
              status: { type: "string" },
            },
            required: ["name", "status"],
          },
          response: {
            201: {
              description: "Project created successfully",
              type: "object",
              properties: {
                rows: { type: "string" },
              },
              required: ["rows"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.createProject,
    );

    fastify.get(
      "/projects",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Get all projects",
          description:
            "Get all the project created by a user or associated with them",
          operationId: "getProjectList",
          querystring: {
            type: "object",
            properties: {
              page: { type: "number", default: 0 },
              pageSize: { type: "number", default: 10 },
              sortBy: { type: "string", default: "created_at" },
              sortOrder: { type: "string", default: "desc" },
            },
          },
          response: {
            200: {
              description:
                "All the projects created by a user or associated with them",
              type: "object",
              properties: {
                rows: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      status: { type: "string" },
                      statuses: { type: "array", items: { type: "string" } },
                      inviteStatus: { type: "string" },
                      members: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            user: {
                              type: "object",
                              properties: {
                                id: { type: "string" },
                                displayName: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                      ownerUserId: { type: "string" },
                      startDate: { type: "string", format: "date" },
                      endDate: { type: "string", format: "date" },
                    },
                  },
                },
                rowCount: { type: "number" },
              },
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getProjectList,
    );
    fastify.get(
      "/projects/:id/members/confirm",
      { preHandler, schema: {} },
      controller.confirmProjectInvite,
    );
    fastify.get(
      "/projects/:id",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Gets a project",
          description: "Gets a project",
          operationId: "getProject",
          params: {
            type: "object",
            properties: { id: { type: "string" } },
          },
          response: {
            200: {
              type: "object",
              properties: {
                createdAt: { type: "string", format: "date" },
                deletedAt: { type: "string", format: "date" },
                description: { type: "string" },
                endDate: { type: "string", format: "date" },
                id: { type: "string" },
                name: { type: "string" },
                ownerUserId: { type: "string" },
                startDate: { type: "string", format: "date" },
                status: { type: "string" },
                updatedAt: { type: "string", format: "date" },
                version: { type: "number" },
                workspaceId: { type: "string" },
              },
              required: [
                "createdAt",
                "deletedAt",
                "description",
                "endDate",
                "id",
                "name",
                "ownerUserId",
                "startDate",
                "status",
                "updatedAt",
                "version",
                "workspaceId",
              ],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getProject,
    );
    fastify.get(
      "/projects/status",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Get list of all project statuses",
          description: "Get list of all project statuses",
          operationId: "getProjectStatusList",
          response: {
            200: {
              description: "Get project status list",
              type: "object",
              properties: {
                rows: { type: "array" },
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
      controller.getProjectStatusList,
    );
    fastify.get(
      "/projects/:id/members",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Get all project members",
          description: "Get all project members for a given project",
          operationId: "getProjectMembers",
          params: {
            type: "object",
            properties: { id: { type: "string" } },
          },
          response: {
            200: {
              description: "Get all project members",
              type: "object",
              properties: {
                rows: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          displayName: { type: "string" },
                          email: { type: "string" },
                        },
                        required: ["id", "displayName", "email"],
                      },
                      createdAt: { type: "string", format: "date" },
                      role: { type: "string" },
                    },
                    required: ["user", "createdAt", "role"],
                  },
                },
                rowCount: { type: "number" },
              },
              required: ["rows", "rowCount"],
            },
            400: { description: "Bad request", $ref: "errorSchema#" },
          },
        },
      },
      controller.getProjectMembers,
    );
    fastify.get(
      "/projects/:id/role",
      { preHandler },
      controller.getProjectRoleList,
    );
    fastify.get(
      "/projects/:id/workspace-members",
      { preHandler },
      controller.getWorkspaceMemberList,
    );
    fastify.patch(
      "/projects/:id",
      {
        preHandler,
        schema: {
          tags: ["project"],
          summary: "Update the project with new properties",
          description: "Update the project with new properties",
          operationId: "updateProject",
          params: {
            type: "object",
            properties: { id: { type: "string" } },
          },
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
              startDate: { type: "string", format: "date" },
              endDate: { type: "string", format: "date" },
            },
          },
          response: {
            200: {
              description: "Project updated successfully",
              type: "string",
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.updateProject,
    );

    done();
  };
};
