import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./interfaces/user-controller.interface";
import { UserService } from "../services/interfaces/user-service.interface";
import { CreateUserRequestDTO } from "../dtos/user/create-user-request.dto";
import { StatusCodes } from "http-status-codes";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: { userService: UserService }) {
    this._userService = container.userService;
  }

  // Create a new user
  create = async (
    req: FastifyRequest<{ Body: CreateUserRequestDTO }>,
    res: FastifyReply,
  ): Promise<Response> => {
    const { email, password, displayName } = req.body;

    const user = new CreateUserRequestDTO({ email, password, displayName });

    const serviceResponse = await this._userService.createUser(user);

    return res.status(StatusCodes.CREATED).send(serviceResponse);
  };

  // Update user email.
  updateEmail = async (
    req: FastifyRequest<{
      Body: { email: string };
      Params: { id: string };
    }>,
    res: FastifyReply,
  ): Promise<Response> => {
    const { id } = req.params;
    const { email } = req.body;

    const response = await this._userService.updateEmail(id, email);

    return res.status(StatusCodes.OK).send(response);
  };

  // contact updatePassword method on the service object
  // updatePassword service will require some sort of DTO
  // return response to the user
  updatePassword = async (
    req: FastifyRequest<{
      Body: { oldPassword: string; newPassword: string };
      Params: { id: string };
    }>,
    res: FastifyReply,
  ) => {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;

    const response = await this._userService.updatePassword(id, {
      oldPassword,
      newPassword,
    });

    return res.status(StatusCodes.OK).send(response);
  };
}
