import { FastifyReply, FastifyRequest } from "fastify";
import { AuthCredentials } from "@sourabhrawatcc/core-utils";
import { StatusCodes } from "http-status-codes";
import { IdentityController } from "./interfaces/identity-controller";
import { IdentityService } from "../services/interfaces/identity.service";

export class CoreIdentityController implements IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  /**
   * Router handler to authenticate user with credentials.
   * @param request
   * @param reply
   */
  generateTokens = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    reply: FastifyReply,
  ) => {
    const credentials = new AuthCredentials(request.body);

    const { rows } = await this.identityService.authenticate(credentials);
    const { accessToken, refreshToken } = rows;

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    reply.setCookie("accessToken", accessToken, cookieOptions);
    reply.setCookie("refreshToken", refreshToken, cookieOptions);

    return reply.send();
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

    const { rows } = await this.identityService.refreshToken({
      accessToken,
      refreshToken,
    });

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
    reply.setCookie("accessToken", rows.accessToken, cookieOptions);
    reply.setCookie("refreshToken", rows.refreshToken, cookieOptions);

    return reply.send();
  };

  /**
   * Route handler to revoke the access and refresh tokens
   * TODO: remove the token from the database
   */
  revokeTokens = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie("accessToken", { path: "/" });
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.send();
  };
}
