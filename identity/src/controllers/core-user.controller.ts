import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./interfaces/user-controller.interface";
import { StatusCodes } from "http-status-codes";
import { AuthCredentials } from "../dtos/auth-credentials.dto";
import { JwtPayload } from "jsonwebtoken";
import { Injectables } from "../app";

export class CoreUserController implements UserController {
  private readonly _userService;

  constructor(container: Injectables) {
    this._userService = container.userService;
  }

  /**
   * Router handler for creating users.
   * @param req
   * @param res
   * @returns
   */
  create = async (
    req: FastifyRequest<{ Body: AuthCredentials }>,
    res: FastifyReply,
  ): Promise<void> => {
    const { email, password, displayName } = req.body;

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
    res.setCookie("accessToken", accessToken, cookieOptions);
    res.setCookie("refreshToken", refreshToken, cookieOptions);

    return res.status(StatusCodes.CREATED).send();
  };

  /**
   * Router handler to authenticate user with credentials.
   * @param req
   * @param res
   */
  login = async (
    req: FastifyRequest<{ Body: AuthCredentials }>,
    res: FastifyReply,
  ): Promise<void> => {
    const { email, password } = req.body;

    const credentials = new AuthCredentials({ email, password });
    const { data } = await this._userService.authenticate(credentials);
    const { accessToken, refreshToken } = data;

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    res.setCookie("accessToken", accessToken, cookieOptions);
    res.setCookie("refreshToken", refreshToken, cookieOptions);

    return res.status(StatusCodes.OK).send();
  };

  /**
   * Route handler to return the currently authenticated user.
   */
  getCurrentUser = (
    req: FastifyRequest,
    res: FastifyReply,
  ): JwtPayload | null => {
    // current user or null
    // we will take the cookie and return the current user
    const { currentUser } = req;
    if (!currentUser) return null;

    return res.status(StatusCodes.OK).send(currentUser);
  };

  /**
   * Route handler to get new access and refresh tokens, if refresh token is valid
   */
  refresh = async (req: FastifyRequest, res: FastifyReply) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      return res.status(StatusCodes.BAD_REQUEST).send();
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
    res.setCookie("accessToken", data.accessToken, cookieOptions);
    res.setCookie("refreshToken", data.refreshToken, cookieOptions);

    return res.status(StatusCodes.OK).send();
  };

  /**
   * Route handler to update user email
   * @param req
   * @param res
   * @returns
   */
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
