import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectActivityController } from "./interfaces/project-activity.controller";
import { ProjectActivityService } from "../services/interfaces/project-activity.service";

export class CoreProjectActivityController
  implements ProjectActivityController
{
  constructor(
    private readonly projectActivityService: ProjectActivityService,
  ) {}

  getProjectActivityList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response =
      await this.projectActivityService.getProjectActivityList(id);

    return reply.send(response);
  };
}
