import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./interfaces/user-controller";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { Services } from "../app/container.config";
import { AuthCredentials } from "@sourabhrawatcc/core-utils";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: Services) {
    this._userService = container.userService;
  }

  /**
   * Router handler for creating users.
   * @param request
   * @param response
   * @returns
   */
  create = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    response: FastifyReply,
  ): Promise<void> => {
    const { email, password, displayName } = request.body;

    const user = new AuthCredentials({ email, password, displayName });
    const {
      data: { accessToken, refreshToken },
    } = await this._userService.createUser(user);

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    response.setCookie("accessToken", accessToken, cookieOptions);
    response.setCookie("refreshToken", refreshToken, cookieOptions);

    return response.status(StatusCodes.CREATED).send();
  };

  /**
   * Router handler to authenticate user with credentials.
   * @param request
   * @param response
   */
  login = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    response: FastifyReply,
  ): Promise<void> => {
    const { email, password } = request.body;

    const credentials = new AuthCredentials({ email, password });
    const { data } = await this._userService.authenticate(credentials);
    const { accessToken, refreshToken } = data;

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    response.setCookie("accessToken", accessToken, cookieOptions);
    response.setCookie("refreshToken", refreshToken, cookieOptions);

    return response.status(StatusCodes.OK).send();
  };

  /**
   * Route handler to return the currently authenticated user.
   */
  getCurrentUser = (
    request: FastifyRequest,
    response: FastifyReply,
  ): JwtPayload | null => {
    // current user or null
    // we will take the cookie and return the current user
    const { currentUser } = request;
    if (!currentUser) return null;

    return response.status(StatusCodes.OK).send(currentUser);
  };

  /**
   * Route handler to get new access and refresh tokens, if refresh token is valid
   */
  refresh = async (request: FastifyRequest, response: FastifyReply) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      return response.status(StatusCodes.BAD_REQUEST).send();
    }

    const { data } = await this._userService.refreshToken({
      accessToken,
      refreshToken,
    });

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    response.setCookie("accessToken", data.accessToken, cookieOptions);
    response.setCookie("refreshToken", data.refreshToken, cookieOptions);

    return response.status(StatusCodes.OK).send();
  };

  /**
   * Route handler to update user email
   * @param request
   * @param response
   * @returns
   */
  updateEmail = async (
    request: FastifyRequest<{
      Body: { email: string };
      Params: { id: string };
    }>,
    response: FastifyReply,
  ): Promise<Response> => {
    const { id } = request.params;
    const { email } = request.body;

    const serviceResponse = await this._userService.updateEmail(id, email);

    return response.status(StatusCodes.OK).send(serviceResponse);
  };

  // contact updatePassword method on the service object
  // updatePassword service will require some sort of DTO
  // return response to the user
  // updatePassword = async (
  //   request: FastifyRequest<{
  //     Body: { oldPassword: string; newPassword: string };
  //     Params: { id: string };
  //   }>,
  //   response: FastifyReply,
  // ) => {
  //   const { id } = request.params;
  //   const { newPassword, oldPassword } = request.body;

  //   const response = await this._userService.updatePassword(id, {
  //     oldPassword,
  //     newPassword,
  //   });

  //   return response.status(StatusCodes.OK).send(response);
  // };
}
