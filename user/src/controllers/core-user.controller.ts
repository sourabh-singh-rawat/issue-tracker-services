import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import {
  AuthCredentials,
  UserRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { UserController } from "./interfaces/user.controller";
import { Services } from "../app/container.config";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: Services) {
    this._userService = container.userService;
  }

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
    await this._userService.createUser(userRegistrationData);

    return reply.status(StatusCodes.CREATED).send();
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
    await this._userService.verifyPassword(authCredentials);

    return reply.status(StatusCodes.OK).send();
  };

  /**
   * Route handler for getting information about currently authenticated user.
   * @returns user details
   */
  getCurrentUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { currentUser } = request;
    const { email } = currentUser;

    const user = await this._userService.getUserInfoByEmail(email);

    return reply.status(StatusCodes.OK).send(user);
  };
}
