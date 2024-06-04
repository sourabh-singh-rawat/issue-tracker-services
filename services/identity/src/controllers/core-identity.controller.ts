import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { IdentityController } from "./interfaces/identity-controller";
import { IdentityService } from "../services/interfaces/identity.service";
import { AuthCredentials } from "@issue-tracker/common";

export class CoreIdentityController implements IdentityController {
  constructor(private readonly identityService: IdentityService) {}

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

  revokeTokens = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie("accessToken", { path: "/" });
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.send();
  };
}
