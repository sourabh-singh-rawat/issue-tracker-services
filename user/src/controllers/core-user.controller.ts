import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import {
  AuthCredentials,
  UserRegistrationData,
  WorkspaceRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { UserController } from "./interfaces/user.controller";
import { UserService } from "../services/interface/user.service";

export class CoreUserController implements UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Route handler for registering new users.
   * @returns status code
   */
  registerUser = async (
    request: FastifyRequest<{ Body: UserRegistrationData }>,
    reply: FastifyReply,
  ) => {
    const { email, password, displayName } = request.body;

    const userRegistrationData = new UserRegistrationData({
      email,
      password,
      displayName,
    });
    await this.userService.createUser(userRegistrationData);

    return reply.status(StatusCodes.CREATED).send();
  };

  // Route handler for changing default workspace
  setDefaultWorkspace = async (
    request: FastifyRequest<{ Body: { id: string; name: string } }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const { id, name } = request.body;

    await this.userService.setDefaultWorkspace(userId, id, name);
    return reply.send();
  };

  /**
   * Route handler for verifying password of existing users.
   * @returns status code
   */
  verifyPassword = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    reply: FastifyReply,
  ) => {
    const { email, password } = request.body;

    const authCredentials = new AuthCredentials({ email, password });
    await this.userService.verifyPassword(authCredentials);

    return reply.send();
  };

  /**
   * Route handler for getting information about currently authenticated user.
   * @returns user details
   */
  getCurrentUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { currentUser } = request;
    const { email } = currentUser;

    const user = await this.userService.getUserInfoByEmail(email);

    return reply.send(user);
  };
}
