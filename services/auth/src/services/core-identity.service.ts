import { v4 } from "uuid";

import { IdentityService } from "./interfaces/identity.service";
import { AccessTokenEntity, RefreshTokenEntity } from "../data/entities";
import { TokenOptions } from "./interfaces/token-options";
import { Typeorm } from "@issue-tracker/orm";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "../data/repositories/interfaces/refresh-token-repository";
import {
  AuthCredentials,
  EmailNotVerifiedError,
  ServiceResponse,
  Tokens,
  UnauthorizedError,
  UserDetails,
  UserNotFoundError,
} from "@issue-tracker/common";
import {
  AccessToken,
  BaseToken,
  JwtToken,
  RefreshToken,
} from "@issue-tracker/security";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserService } from "./interfaces/user.service";

export class CoreIdentityService implements IdentityService {
  constructor(
    private readonly orm: Typeorm,
    private readonly userRepository: UserRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userService: UserService,
  ) {}

  private isUserExistsByEmail = async (email: string) => {
    return await this.userRepository.existsByEmail(email);
  };

  private getUserByEmail = async (email: string) => {
    return await this.userRepository.findByEmail(email);
  };

  private getUserById = async (id: string) => {
    return await this.userRepository.findById(id);
  };

  private generateTime = (min: number) => {
    return Math.floor(Date.now() / 1000) + min * 60;
  };

  private generateId = () => {
    return v4();
  };

  private createAccessToken = (
    userDetails: UserDetails,
    options: TokenOptions,
  ) => {
    const { exp, jwtid } = options;

    const { userId, email, emailVerificationStatus, displayName, createdAt } =
      userDetails;

    const payload: AccessToken = {
      userId,
      email,
      emailVerificationStatus,
      createdAt,
      displayName,
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
      iss: "identity-service",
      aud: "client",
      sub: userDetails.userId,
      exp,
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newAccessToken = new AccessTokenEntity();
    newAccessToken.id = jwtid;
    newAccessToken.userId = userDetails.userId;
    newAccessToken.tokenValue = JwtToken.create(payload, secret);
    newAccessToken.expirationAt = new Date(exp * 1000);

    return newAccessToken;
  };

  private createRefreshToken = (userId: string, options: TokenOptions) => {
    const { exp, jwtid } = options;
    const payload: RefreshToken = {
      userId,
      iss: "identity-service",
      aud: "client",
      sub: userId,
      exp,
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newRefreshToken = new RefreshTokenEntity();
    newRefreshToken.id = jwtid;
    newRefreshToken.userId = userId;
    newRefreshToken.tokenValue = JwtToken.create(payload, secret);
    newRefreshToken.expirationAt = new Date(exp * 1000);

    return newRefreshToken;
  };

  private generateTokens = (user: UserDetails) => {
    const access = this.createAccessToken(user, {
      exp: this.generateTime(15),
      jwtid: this.generateId(),
    });
    // create refresh token
    const refresh = this.createRefreshToken(user.userId, {
      exp: this.generateTime(60 * 24),
      jwtid: this.generateId(),
    });

    return { access, refresh };
  };

  private saveTokens = async (
    accessToken: AccessTokenEntity,
    refreshToken: RefreshTokenEntity,
  ) => {
    const queryRunner = this.orm.createQueryRunner();
    await this.orm.transaction(queryRunner, async (queryRunner) => {
      await this.accessTokenRepository.save(accessToken, { queryRunner });
      await this.refreshTokenRepository.save(refreshToken, { queryRunner });
    });
  };

  authenticate = async (credentials: AuthCredentials) => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();
    if (!user.emailVerificationStatus) throw new EmailNotVerifiedError();

    await this.userService.verifyPassword({ email, password });

    const { access, refresh } = this.generateTokens({
      userId: user.id,
      email: user.email,
      emailVerificationStatus: user.emailVerificationStatus,
      createdAt: user.createdAt,
    });

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      rows: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };

  refreshToken = async (token: Tokens) => {
    const { refreshToken } = token;
    const secret = process.env.JWT_SECRET;

    const { userId, jwtid } = JwtToken.verify<BaseToken>(refreshToken, secret!);

    const isTokenPresent = await this.refreshTokenRepository.existsById(jwtid);
    if (!isTokenPresent) throw new UnauthorizedError();

    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const { access, refresh } = this.generateTokens({
      userId: user.id,
      email: user.email,
      createdAt: user.createdAt,
      emailVerificationStatus: user.emailVerificationStatus,
    });

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      rows: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };
}
