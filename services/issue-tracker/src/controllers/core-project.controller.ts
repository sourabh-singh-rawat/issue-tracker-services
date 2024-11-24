import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectController } from "./interfaces/project.controller";

import { ListService } from "../services/interfaces/ListService";
import { StatusCodes } from "http-status-codes";
import { Filters, ProjectFormData, ProjectRoles } from "@issue-tracker/common";

export class CoreProjectController implements ProjectController {
  constructor(private projectService: ListService) {}

  createProject = async (
    request: FastifyRequest<{ Body: ProjectFormData }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const project = request.body;

    // const response = await this.projectService.createProject(userId, project);

    return reply.status(StatusCodes.CREATED).send();
  };

  getProjectList = async (
    request: FastifyRequest<{ Querystring: Filters }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const filters = request.query;

    return reply.send([]);
  };

  getProject = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response = await this.projectService.findListById(id);

    return reply.send(response);
  };

  updateProject = async (
    request: FastifyRequest<{ Params: { id: string }; Body: ProjectFormData }>,
  ) => {
    const { id } = request.params;
    const updatables = request.body;

    // await this.projectService.updateList({ id, ...updatables, manager });
  };
}
