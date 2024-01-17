import multipart from "@fastify/multipart";
import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/containers";

export const issueAttachmentRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
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
