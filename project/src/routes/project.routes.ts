import { FastifyInstance, FastifyRequest } from "fastify";
import { serviceContainer } from "../app/service-container";

export const projectRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const projectController = serviceContainer.get("projectController");
  fastify.post("/", projectController.createProject);
  fastify.get("/", projectController.getProjectList);
  fastify.get("/status", projectController.getProjectStatusList);
  fastify.patch("/:id", projectController.updateProject);

  done();
};
