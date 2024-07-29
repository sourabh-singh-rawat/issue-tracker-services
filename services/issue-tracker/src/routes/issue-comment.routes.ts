import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { RegisteredServices } from "..";

export const issueCommentRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueCommentController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/issues/:id/comments",
      {
        preHandler,
        schema: {
          tags: ["issue", "comment"],
          summary: "Create a new issue comment",
          description: "Create a new issue comment",
          operationId: "createIssueComment",
          params: {
            type: "object",
            properties: {
              id: { type: "string", maxLength: 3000, default: "" },
            },
          },
          body: {
            type: "object",
            properties: {
              description: {
                type: "string",
              },
            },
          },
          response: {
            201: {
              description: "The comment has been created successfully",
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
      controller.createIssueComment,
    );

    fastify.get(
      "/issues/:id/comments",
      {
        preHandler,
        schema: {
          operationId: "getIssueCommentList",
          params: { type: "object", properties: { id: { type: "string" } } },
          response: {
            200: {
              type: "object",
              properties: {
                rows: {
                  type: "array",
                },
                filteredRowCount: {
                  type: "number",
                },
              },
              required: ["rows", "filteredRowCount"],
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.getIssueCommentList,
    );

    fastify.delete(
      "/issues/:id/comments/:commentId",
      {
        preHandler,
        schema: {
          operationId: "deleteIssueComment",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
              commentId: { type: "string" },
            },
          },
          response: {
            201: {
              type: "string",
              description: "The comment has been created successfully",
            },
            400: {
              description: "Bad request",
              $ref: "errorSchema#",
            },
          },
        },
      },
      controller.deleteIssueComment,
    );

    done();
  };
};
