import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectActivityController } from "./interfaces/project-activity.controller";
import { ProjectActivityService } from "../services/interfaces/project-activity.service";

interface Params {
  id: string;
}

export class CoreProjectActivityController
  implements ProjectActivityController
{
  constructor(
    private readonly projectActivityService: ProjectActivityService,
  ) {}

  getProjectActivityList = async (
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response =
      await this.projectActivityService.getProjectActivityList(id);

    return reply.send(response);
  };
}
