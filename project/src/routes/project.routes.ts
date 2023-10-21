import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { serviceContainer } from "../app/service-container";
import { Auth } from "@sourabhrawatcc/core-utils";

export const projectRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
  const controller = serviceContainer.get("projectController");
  const { requireTokens, setCurrentUser, requireAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/", auth, controller.createProject);
  fastify.get("/", auth, controller.getProjectList);
  fastify.get("/status", auth, controller.getProjectStatusList);
  fastify.get("/:id", auth, controller.getProject);
  fastify.get("/:id/members", auth, controller.getProjectMembers);
  fastify.patch("/:id", auth, controller.updateProject);

  done();
};
