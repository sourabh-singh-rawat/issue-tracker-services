import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { serviceContainer } from "../app/service-container";
import { Auth } from "@sourabhrawatcc/core-utils";

export const workspaceRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
  const controller = serviceContainer.get("workspaceController");
  const { requireTokens, setCurrentUser, requireAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/", auth, controller.createWorkspace);
  fastify.post("/invite", auth, controller.createWorkspaceInvite);
  fastify.get("/", auth, controller.getAllWorkspaces);
  fastify.get("/role", auth, controller.getWorkspaceRoleList);
  fastify.get("/:id", auth, controller.getWorkspace);
  fastify.get("/:id/invite/confirm", controller.confirmWorkspaceInvite);

  done();
};
