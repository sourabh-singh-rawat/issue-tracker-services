import {
  Hash,
  Token,
  ServiceResponseDTO,
  PostgresContext,
  UnauthorizedError,
} from "@sourabhrawatcc/core-utils";

import { UserService } from "./interfaces/user-service.interface";
import { UserRepository } from "../data/repositories/interfaces/user-repository.interface";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository.interface";

import { PostgresRefreshTokenRepository } from "../data/repositories/postgres-refresh-token.repository";

import { UserAlreadyExists } from "../errors/repository/user-already-exists.error";
import { UserNotFoundError } from "../errors/repository/user-not-found.error";

// import { UserPasswordUpdateDto } from "../dtos/user/user-password-update.dto";
import { UserDetailDto } from "../dtos/user/user-detail.dto";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  UserCredentialsDTO,
} from "../dtos/user";

export class CoreUserService implements UserService {
  private readonly _context;
  private readonly _userRepository;
  private readonly _accessTokenRepository;
  private readonly _refreshTokenRepository;

  constructor(container: {
    postgresContext: PostgresContext;
    userRepository: UserRepository;
    accessTokenRepository: AccessTokenRepository;
    refreshTokenRepository: PostgresRefreshTokenRepository;
  }) {
    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._accessTokenRepository = container.accessTokenRepository;
    this._refreshTokenRepository = container.accessTokenRepository;
  }

  /**
   * Creates user and their profile
   * @param user
   * @returns
   */
  createUser = async (
    user: CreateUserRequestDTO,
  ): Promise<ServiceResponseDTO<CreateUserResponseDTO>> => {
    const { email, password } = user;

    // Check user exists
    const isUserCreated = await this._userRepository.existsByEmail(email);

    if (isUserCreated) {
      throw new UserAlreadyExists();
    }

    // Hash password
    const { hash, salt } = await Hash.create(password);

    // Create new user
    const newUser = new UserCredentialsDTO({
      email,
      hash,
      salt,
      plain: password,
    });

    // Transaction to save user, accessToken, and refreshToken
    const transactionResult = await this._context.transaction(async (t) => {
      const savedUser = await this._userRepository.save(newUser, { t });

      // create accessToken
      const userDetail = new UserDetailDto({
        id: savedUser.id,
        email: savedUser.email,
        isEmailVerified: savedUser.isEmailVerified,
        createdAt: savedUser.createdAt,
      });
      const accessTokenExp = Date.now() + 15 * 60 * 1000;
      const accessToken = this.createAccessToken(userDetail, accessTokenExp);

      // save access token
      await this._accessTokenRepository.save(
        {
          userId: savedUser.id,
          tokenValue: accessToken,
          expirationAt: new Date(accessTokenExp),
        },
        { t },
      );

      // create refresh token
      const refreshTokenExp = Date.now() + 60 * 60 * 1000;
      const refreshToken = this.createRefreshToken(userDetail, refreshTokenExp);

      // save refresh token
      await this._refreshTokenRepository.save(
        {
          userId: savedUser.id,
          tokenValue: refreshToken,
          expirationAt: new Date(refreshTokenExp),
        },
        { t },
      );

      return { accessToken, refreshToken };
    });

    const { accessToken, refreshToken } = transactionResult;

    return new ServiceResponseDTO({
      data: { accessToken, refreshToken },
    });
  };

  /**
   * Logins the user
   * @param user
   */
  loginUser = async (
    credentials: UserCredentialsDTO,
  ): Promise<
    ServiceResponseDTO<{ accessToken: string; refreshToken: string }>
  > => {
    const { email, plain } = credentials;

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    // Compare user's hashed password with password+salt
    const isPasswordValid = await Hash.verify(
      user.passwordHash,
      user.passwordSalt,
      plain,
    );

    // if matches then create access and refresh token
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    const transactionResult = await this._context.transaction(async (t) => {
      const userDetail = {
        id: user.id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      };

      const accessTokenExp = Date.now() + 15 * 60 * 1000;
      const accessToken = this.createAccessToken(userDetail, accessTokenExp);
      await this._accessTokenRepository.save(
        {
          userId: user.id,
          tokenValue: accessToken,
          expirationAt: new Date(accessTokenExp),
        },
        { t },
      );

      // create refresh token
      const refreshTokenExp = Date.now() + 60 * 60 * 1000;
      const refreshToken = this.createRefreshToken(userDetail, refreshTokenExp);

      // save refresh token
      await this._refreshTokenRepository.save(
        {
          userId: user.id,
          tokenValue: refreshToken,
          expirationAt: new Date(refreshTokenExp),
        },
        { t },
      );

      return { accessToken, refreshToken };
    });

    return new ServiceResponseDTO({
      data: {
        accessToken: transactionResult.accessToken,
        refreshToken: transactionResult.refreshToken,
      },
    });
  };

  /**
   * Creates and saves accessToken in the database
   * @param userDetails
   * @param exp expiration time in ms
   * @returns access token string
   */
  private createAccessToken = (user: UserDetailDto, exp: number): string => {
    const { id, email, isEmailVerified } = user;

    const payload = {
      id,
      email,
      isEmailVerified,
      displayName: "temporay display name",
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
      iss: "identity-service",
      aud: "client",
      sub: id,
      exp: Math.floor(exp / 1000),
    };
    const secret = process.env.JWT_SECRET as string;

    return Token.create(payload, secret);
  };

  /**
   * Create refreshToken
   * @param userDetails
   * @param exp expiration time in ms
   * @returns refresh token string
   */
  createRefreshToken = (userDetails: UserDetailDto, exp: number): string => {
    const { id } = userDetails;

    const payload = {
      id,
      iss: "identity-service",
      aud: "client",
      sub: id,
      exp: Math.floor(exp / 1000),
    };
    const secret = process.env.JWT_SECRET as string;
    const refreshToken = Token.create(payload, secret);

    return refreshToken;
  };

  // TODO: revokeToken methods

  /**
   * Updates user email
   * @param id
   * @param email
   * @returns
   */
  updateEmail = async (id: string, email: string) => {
    const updatedUser = await this._userRepository.updateEmail(id, email);

    return updatedUser;
  };

  /**
   * Update user password.
   * @param {string} id id of the user whos password is being updated.
   * @param {UserPasswordUpdateDto} data
   * @returns service response?
   */
  // updatePassword = async (id: string, data: UserPasswordUpdateDto) => {
  //   // Check if old password matches with the new password
  //   // If matched update the user's passwords

  //   const updatedUser = await this._userRepository.updatePassword(
  //     id,
  //     data.newPassword,
  //   );

  //   return updatedUser;
  // };
}
