import { FastifyReply, FastifyRequest } from "fastify";
import { AuthCredentials } from "@sourabhrawatcc/core-utils";
import { StatusCodes } from "http-status-codes";
import { IdentityController } from "./interfaces/identity-controller";
import { Services } from "../app/container.config";

export class CoreIdentityController implements IdentityController {
  private readonly _identityService;

  constructor(container: Services) {
    this._identityService = container.identityService;
  }

  /**
   * Router handler to authenticate user with credentials.
   * @param request
   * @param reply
   */
  generateTokens = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { email, password } = request.body;

    const credentials = new AuthCredentials({ email, password });

    const { data } = await this._identityService.authenticate(credentials);
    const { accessToken, refreshToken } = data;

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    reply.setCookie("accessToken", accessToken, cookieOptions);
    reply.setCookie("refreshToken", refreshToken, cookieOptions);

    return reply.status(StatusCodes.OK).send();
  };

  /**
   * Route handler to get new access and refresh tokens, if refresh token is valid
   */
  refreshTokens = async (request: FastifyRequest, reply: FastifyReply) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      return reply.status(StatusCodes.BAD_REQUEST).send();
    }

    const { data } = await this._identityService.refreshToken({
      accessToken,
      refreshToken,
    });

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    reply.setCookie("accessToken", data.accessToken, cookieOptions);
    reply.setCookie("refreshToken", data.refreshToken, cookieOptions);

    return reply.status(StatusCodes.OK).send();
  };
}
