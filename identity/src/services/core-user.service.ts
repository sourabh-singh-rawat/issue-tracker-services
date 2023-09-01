import {
  Hash,
  Token,
  ServiceResponseDTO,
  PostgresContext,
} from "@sourabhrawatcc/core-utils";
import { UserRepository } from "../data/repositories/interfaces/user-repository.interface";
import { UserCredentialsDTO } from "../dtos/user";
import { CreateUserRequestDTO } from "../dtos/user/create-user-request.dto";
import { UserDetailDto } from "../dtos/user/user-detail.dto";
import { UserPasswordUpdateDto } from "../dtos/user/user-password-update.dto";
import { UserAlreadyExists } from "../errors/repository/user-already-exists.error";
import { UserService } from "./interfaces/user-service.interface";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository.interface";
import { PostgresRefreshTokenRepository } from "../data/repositories/postgres-refresh-token.repository";

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
  ): Promise<
    ServiceResponseDTO<{
      accessToken: string;
      refreshToken: string;
    }>
  > => {
    const { email, password } = user;

    // Check user exists
    const isUserCreated = await this._userRepository.existsByEmail(email);

    if (isUserCreated) {
      throw new UserAlreadyExists();
    }

    // Hash password
    const hashedPassword = await Hash.create(password);

    // Create new user
    const newUser = new UserCredentialsDTO({ email, password: hashedPassword });

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
      const accessToken = this.createAccessToken(
        userDetail,
        Math.floor(accessTokenExp / 1000),
      );

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
      const refreshToken = this.createRefreshToken(
        userDetail,
        Math.floor(refreshTokenExp / 1000),
      );

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
   * Creates and saves accessToken in the database
   * @param userDetails
   * @param exp The expiration time in seconds
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
      exp,
    };
    const secret = process.env.JWT_SECRET as string;

    return Token.create(payload, secret);
  };

  /**
   * Create refreshToken
   * @param userDetails
   * @returns refresh token string
   */
  createRefreshToken = (userDetails: UserDetailDto, exp: number): string => {
    const { id } = userDetails;

    const payload = {
      id,
      iss: "identity-service",
      aud: "client",
      sub: id,
      exp,
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
  updatePassword = async (id: string, data: UserPasswordUpdateDto) => {
    // Check if old password matches with the new password
    // If matched update the user's passwords

    const updatedUser = await this._userRepository.updatePassword(
      id,
      data.newPassword,
    );

    return updatedUser;
  };

  // Compare password function
}
