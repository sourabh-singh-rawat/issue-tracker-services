import { v4 } from "uuid";
import axios from "axios";
import {
  AccessToken,
  AuthCredentials,
  BaseToken,
  TypeormStore,
  EmailNotVerifiedError,
  InvalidCredentialsError,
  JwtToken,
  RefreshToken,
  ServiceResponse,
  Tokens,
  UnauthorizedError,
  UserDetails,
  UserNotFoundError,
} from "@sourabhrawatcc/core-utils";

import { IdentityService } from "./interfaces/identity.service";
import { AccessTokenEntity, RefreshTokenEntity } from "../data/entities";
import { StatusCodes } from "http-status-codes";
import { TokenOptions } from "./interfaces/token-options";
import { UserRepository } from "../data/repositories/interfaces/user-repository";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "../data/repositories/interfaces/refresh-token-repository";

export class CoreIdentityService implements IdentityService {
  constructor(
    private readonly store: TypeormStore,
    private readonly userRepository: UserRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  /**
   * Return Boolean indicating whether the user exists.
   * @param email
   * @returns
   */
  private isUserExistsByEmail = async (email: string) => {
    return await this.userRepository.existsByEmail(email);
  };

  /**
   * Returns user, if user exists else returns null.
   * @param email
   * @returns
   */
  private getUserByEmail = async (email: string) => {
    return await this.userRepository.findByEmail(email);
  };

  private getUserById = async (id: string) => {
    return await this.userRepository.findById(id);
  };

  /**
   * Returns number of seconds past unix epoch + x min.
   * @param min
   * @returns
   */
  private generateTime = (min: number) => {
    return Math.floor(Date.now() / 1000) + min * 60;
  };

  private generateId = () => {
    return v4();
  };

  /**
   * Creates accessToken
   * @param userDetails
   * @param exp expiration time in ms
   * @returns access token string
   */
  private createAccessToken = (
    userDetails: UserDetails,
    options: TokenOptions,
  ) => {
    const { exp, jwtid } = options;

    const {
      userId,
      email,
      isEmailVerified,
      defaultWorkspaceId,
      displayName,
      createdAt,
    } = userDetails;

    const payload: AccessToken = {
      userId,
      email,
      isEmailVerified,
      workspaceId: defaultWorkspaceId,
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

  /**
   * Create refreshToken
   * @param userDetails
   * @param exp expiration time in ms
   * @returns refresh token string
   */
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

  /**
   * Generates access and refresh tokens
   * @returns tokens
   */
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
    const queryRunner = this.store.createQueryRunner();
    await this.store.transaction(queryRunner, async (queryRunner) => {
      await this.accessTokenRepository.save(accessToken, { queryRunner });
      await this.refreshTokenRepository.save(refreshToken, { queryRunner });
    });
  };

  /**
   * Authenticates the current user with provided credentials
   * @param user
   */
  authenticate = async (credentials: AuthCredentials) => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();
    if (!user.isEmailVerified) throw new EmailNotVerifiedError();

    const response = await axios.post(
      "http://user-service:4000/api/v1/users/verify-password",
      { email, password },
    );

    if (response.status !== StatusCodes.OK) throw new InvalidCredentialsError();

    const userDetails = new UserDetails({
      userId: user.id,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      defaultWorkspaceId: user.defaultWorkspaceId,
      createdAt: user.createdAt,
    });

    const { access, refresh } = this.generateTokens(userDetails);

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      rows: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };

  // TODO: revokeToken methods
  // removes both access and refresh tokens from the database

  /**
   * Generate new access tokens and refresh tokens
   * @param token
   * @returns
   */
  refreshToken = async (token: Tokens) => {
    const { refreshToken } = token;
    const secret = process.env.JWT_SECRET;

    const { userId, jwtid } = JwtToken.verify<BaseToken>(refreshToken, secret!);

    const isTokenPresent = await this.refreshTokenRepository.existsById(jwtid);
    if (!isTokenPresent) throw new UnauthorizedError();

    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const userDetails = new UserDetails({
      userId: user.id,
      email: user.email,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
      defaultWorkspaceId: user.defaultWorkspaceId,
    });

    const { access, refresh } = this.generateTokens(userDetails);

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      rows: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };
}
