import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./interfaces/user-controller.interface";
import { UserService } from "../services/interfaces/user-service.interface";
import { UserBodyDto } from "../dtos/user/post-user.dto";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: { userService: UserService }) {
    this._userService = container.userService;
  }

  create = async (
    request: FastifyRequest<{ Body: UserBodyDto }>,
    reply: FastifyReply,
  ): Promise<Response> => {
    const { displayName, email, password } = request.body;

    const serviceResponse = await this._userService.createUser({
      displayName,
      email,
      password,
    });

    return reply.send(serviceResponse);
  };

  update = async (
    request: FastifyRequest<{ Body: UserBodyDto; Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<Response> => {
    const { id } = request.params;
    const { email, password } = request.body;

    const response = await this._userService.updateUser(id, {
      email,
      password,
    });

    return reply.send(response);
  };
}
