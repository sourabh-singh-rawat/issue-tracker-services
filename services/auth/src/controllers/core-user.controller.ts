import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { UserController } from "./interfaces/user.controller";
import { AuthCredentials, UserRegistrationData } from "@issue-tracker/common";
import { UserService } from "../Services/Interfaces/user.service";
import { UserAuthenticationService } from "../Services/Interfaces";
import { dataSource } from "..";

export class CoreUserController implements UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthenticationService: UserAuthenticationService,
  ) {}

  registerUser = async (
    request: FastifyRequest<{
      Body: UserRegistrationData;
      Querystring: { workspaceInviteToken: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { workspaceInviteToken } = request.query;
    const { email, password, displayName } = request.body;
    // await this.userService.createUser(
    //   userRegistrationData,
    //   workspaceInviteToken,
    // );
    await dataSource.transaction(async (manager) => {
      await this.userAuthenticationService.createUserWithEmailAndPassword({
        manager,
        displayName,
        email,
        password,
      });
    });
    reply.clearCookie("accessToken", { path: "/" });
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.status(StatusCodes.CREATED).send();
  };

  verifyPassword = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    reply: FastifyReply,
  ) => {
    const { email, password } = request.body;

    const authCredentials = new AuthCredentials({ email, password });
    await this.userService.verifyPassword(authCredentials);

    return reply.send();
  };

  verifyEmail = async (
    request: FastifyRequest<{
      Querystring: { confirmationEmail: string };
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { confirmationEmail } = request.query;
    const { id } = request.params;
    await this.userService.verifyEmail(id, confirmationEmail);

    return reply.send({ confirmation: true });
  };

  getCurrentUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request;
    const { email } = user;

    return reply.send(await this.userService.getUserInfoByEmail(email));
  };
}
