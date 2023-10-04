import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { serviceContainer } from "../app/service-container";

export const projectRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const projectController = serviceContainer.get("projectController");
  fastify.post("/", projectController.createProject);

  done();
};
