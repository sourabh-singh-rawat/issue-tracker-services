import multipart from "@fastify/multipart";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { RegisteredServices } from "..";

export const issueAttachmentRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    fastify.register(multipart, {
      limits: { fileSize: 10000000, files: 1 },
    });

    const controller = container.get("issueAttachmentController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const auth: RouteShorthandOptions = {
      preHandler: [requireTokens, setCurrentUser, requireAuth],
    };

    fastify.post("/issues/:id", auth, controller.createIssueAttachment);
    fastify.get("/issues/:id", auth, controller.getIssueAttachmentList);

    done();
  };
