import multipart from "@fastify/multipart";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RegisteredServices } from "..";

export const issueAttachmentRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    fastify.register(multipart, {
      limits: { fileSize: 10000000, files: 1 },
    });

    const controller = container.get("issueAttachmentController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const preHandler = [requireTokens, setCurrentUser, requireAuth];

    fastify.post(
      "/issues/:id",
      {
        preHandler,
        schema: {
          tags: ["attachment"],
          summary: "Create a new issue attachment",
          description: "Create a new issue attachment",
          operationId: "createIssueAttachment",
          body: { type: "string" },
          consumes: ["multipart/form-data"],
          response: {
            201: {
              type: "string",
              description: "Created a new issue attachment",
            },
            400: {
              type: "string",
              description: "The request contains invalid body parameters",
            },
            401: {
              type: "string",
              description: "User credentials are invalid",
            },
            403: {
              type: "string",
              description: "User may be blocked",
            },
            429: {
              type: "string",
              description: "User is blocked for sending too many request",
            },
            500: {
              description: "Something went wrong",
              type: "object",
              properties: {
                errors: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      field: { type: "string" },
                    },
                    required: ["message"],
                  },
                },
              },
            },
          },
        },
      },
      controller.createIssueAttachment,
    );
    fastify.get(
      "/issues/:id",
      {
        preHandler,
        schema: {
          tags: ["attachment"],
          operationId: "getIssueAttachmentList",
          summary: "Get issue attachment list",
          description: "Get issue attachment list",
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            200: {
              description: "List of issue attachments",
              type: "object",
              properties: {
                rows: { type: "array" },
                filteredRowCount: { type: "number" },
              },
              required: ["rows", "rowCount"],
            },
            400: {
              type: "string",
              description: "The request contains invalid body parameters",
            },
          },
        },
      },
      controller.getIssueAttachmentList,
    );

    done();
  };
