import { AwilixDi } from "@issue-tracker/server-core";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { RegisteredServices } from "..";

export const workspaceRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("workspaceController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/workspaces",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Create a workspace",
          description: "Create a new workspace to start adding projects",
          operationId: "createWorkspace",
          body: {
            description: "Fields used to create a workspace",
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "A name for your workspace",
                minLength: 1,
              },
              description: {
                type: "string",
                description: "A description for your workspace",
                maxLength: 3000,
              },
            },
            required: ["name"],
          },
          response: {
            201: {
              description: "Workspace created",
              type: "object",
              properties: {
                id: { type: "string" },
              },
              required: ["id"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.createWorkspace,
    );
    fastify.post(
      "/workspaces/invite",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Create a workspace member invite",
          description: "Create a new workspace member invite",
          operationId: "createWorkspaceInvite",
          body: {
            description: "Fields used to create a new workspace member invite",
            type: "object",
            properties: {
              email: {
                type: "string",
                minLength: 1,
                maxLength: 80,
                format: "email",
                default: "Sourabh.rawatcc@gmail.com",
              },
              workspaceRole: { type: "string" },
            },
            required: ["email", "workspaceRole"],
          },
          response: {
            201: { description: "Workspace member created", type: "string" },
            400: { description: "Bad request", $ref: "errorSchema#" },
          },
        },
      },
      controller.createWorkspaceInvite,
    );
    fastify.get(
      "/workspaces",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Get all workspaces",
          description: "Get all workspaces of the user",
          operationId: "getAllWorkspaces",
          response: {
            200: {
              description: "All workspaces",
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
                      createdAt: { type: "string", format: "date" },
                    },
                    required: ["id", "name", "status", "createdAt"],
                  },
                },
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
      controller.getAllWorkspaces,
    );
    fastify.get(
      "/workspaces/role",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Get list of all workspace roles",
          description:
            "Get all the default roles that are available in the workspace",
          operationId: "getWorkspaceRoleList",
          response: {
            200: {
              description: "Get workspace role list",
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
      controller.getWorkspaceRoleList,
    );
    fastify.get(
      "/workspaces/:id",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Get workspace",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          operationId: "getWorkspace",
          response: {
            200: {
              description: "Returns the workspace",
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                createdAt: { type: "string" },
                description: { type: "string" },
              },
              required: ["id", "name"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getWorkspace,
    );
    fastify.get(
      "/workspaces/:id/invite/confirm",
      { preHandler, schema: {} },
      controller.confirmWorkspaceInvite,
    );
    fastify.get(
      "/workspaces/:id/members",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Get all workspace members",
          description: "Get all workspace members",
          operationId: "getWorkspaceMembers",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            200: {
              description: "All the workspace members",
              type: "object",
              properties: {
                rows: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      userId: { type: "string" },
                      workspaceId: { type: "string" },
                      status: { type: "string" },
                      role: { type: "string" },
                      user: {
                        type: "object",
                        properties: {
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                          deletedAt: { type: "string" },
                          version: { type: "number" },
                          id: { type: "string" },
                          email: { type: "string" },
                          defaultWorkspaceId: { type: "string" },
                          emailVerificationStatus: { type: "string" },
                          displayName: { type: "string" },
                          photoUrl: { type: "string" },
                        },
                        required: [
                          "id",
                          "email",
                          "defaultWorkspaceId",
                          "displayName",
                        ],
                      },
                    },
                  },
                },
                filteredRowCount: { type: "number" },
              },
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getWorkspaceMembers,
    );
    fastify.patch(
      "/workspaces/:id",
      {
        preHandler,
        schema: {
          tags: ["workspace"],
          summary: "Udpate workspace",
          description: "Udpate workspace",
          operationId: "updateWorkspace",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
            },
            required: ["name"],
          },
          response: {
            200: {
              description: "Workspace updated successfully",
              type: "string",
            },
            400: {
              description: "Workspace updated successfully",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.updateWorkspace,
    );

    done();
  };
};
