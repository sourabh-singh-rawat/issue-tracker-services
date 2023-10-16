import { FastifyInstance, FastifyRequest } from "fastify";
import { serviceContainer } from "../app/service-container";

export const issueRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const issueController = serviceContainer.get("issueController");

  fastify.post("/", issueController.createIssue);
  done();
};
