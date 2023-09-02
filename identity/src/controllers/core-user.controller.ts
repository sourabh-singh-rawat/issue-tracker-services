import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./interfaces/user-controller.interface";
import { UserService } from "../services/interfaces/user-service.interface";
import { CreateUserRequestDTO } from "../dtos/user/create-user-request.dto";
import { StatusCodes } from "http-status-codes";
import { UserDetailDto } from "../dtos/user/user-detail.dto";
import { UserCredentialsDTO } from "../dtos/user";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: { userService: UserService }) {
    this._userService = container.userService;
  }

  /**
   * Returns the current authenticated user
   */
  getCurrentUser = async (
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<UserDetailDto | null> => {
    // current user or null
    // we will take the cookie and return the current user
    const { currentUser } = req;
    if (!currentUser) return null;

    return res.status(StatusCodes.OK).send(currentUser);
  };

  // Create a new user
  create = async (
    req: FastifyRequest<{ Body: CreateUserRequestDTO }>,
    res: FastifyReply,
  ): Promise<void> => {
    const { email, password, displayName } = req.body;

    const user = new CreateUserRequestDTO({ email, password, displayName });
    const { data } = await this._userService.createUser(user);

    res.setCookie("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.setCookie("refreshToken", data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    return res.status(StatusCodes.CREATED).send();
  };

  /**
   *
   * @param req
   * @param res
   */
  login = async (
    req: FastifyRequest<{
      Body: { email: string; password: string };
    }>,
    res: FastifyReply,
  ): Promise<void> => {
    const { email, password } = req.body;

    const credential = new UserCredentialsDTO({ email, plain: password });
    const { data } = await this._userService.loginUser(credential);

    res.setCookie("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.setCookie("refreshToken", data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    return res.status(StatusCodes.OK).send();
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
  // updatePassword = async (
  //   req: FastifyRequest<{
  //     Body: { oldPassword: string; newPassword: string };
  //     Params: { id: string };
  //   }>,
  //   res: FastifyReply,
  // ) => {
  //   const { id } = req.params;
  //   const { newPassword, oldPassword } = req.body;

  //   const response = await this._userService.updatePassword(id, {
  //     oldPassword,
  //     newPassword,
  //   });

  //   return res.status(StatusCodes.OK).send(response);
  // };
}
