import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { container } from "../app/containers";
import { Auth } from "@sourabhrawatcc/core-utils";

export const projectRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
  const controller = container.get("projectController");
  const { requireTokens, setCurrentUser, requireAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/", auth, controller.createProject);
  fastify.post("/:id/members/invite", auth, controller.createProjectInvite);
  fastify.get("/:id/members/confirm", controller.confirmProjectInvite);
  fastify.get("/", auth, controller.getProjectList);
  fastify.get("/status", auth, controller.getProjectStatusList);
  fastify.get("/:id", auth, controller.getProject);
  fastify.get("/:id/members", auth, controller.getProjectMembers);
  fastify.get("/:id/role", auth, controller.getProjectRoleList);
  fastify.get(
    "/:id/workspace-members",
    auth,
    controller.getWorkspaceMemberList,
  );
  fastify.patch("/:id", auth, controller.updateProject);

  done();
};
