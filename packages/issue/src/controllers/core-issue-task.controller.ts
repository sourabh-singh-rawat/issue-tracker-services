import { FastifyReply, FastifyRequest } from "fastify";
import { IssueTaskController } from "./interfaces/issue-task.controller";
import { IssueTaskService } from "../services/interfaces/issue-task.service";
import { TaskFormData } from "@sourabhrawatcc/core-utils";

export class CoreIssueTaskController implements IssueTaskController {
  constructor(private readonly issueTaskService: IssueTaskService) {}

  createIssueTask = async (
    request: FastifyRequest<{ Body: TaskFormData; Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const formData = request.body;
    const { userId } = request.currentUser;

    await this.issueTaskService.createTask(userId, id, formData);

    return reply.send();
  };

  getTaskList = async (request: FastifyRequest, reply: FastifyReply) => {};

  getIssueTaskList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response = await this.issueTaskService.getIssueTaskList(id);

    return reply.send(response);
  };

  getIssueTask = async (request: FastifyRequest, reply: FastifyReply) => {};

  updateIssueTask = async (
    request: FastifyRequest<{
      Params: { taskId: string };
      Body: TaskFormData;
    }>,
    reply: FastifyReply,
  ) => {
    const { taskId } = request.params;
    const taskFormData = request.body;
    this.issueTaskService.updateIssueTask(taskId, taskFormData);
  };

  deleteIssueTask = async (request: FastifyRequest, reply: FastifyReply) => {};
}
