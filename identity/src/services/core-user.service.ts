import {
  Hash,
  Token,
  ServiceResponse,
  PostgresContext,
  UnauthorizedError,
} from "@sourabhrawatcc/core-utils";

import { v4 } from "uuid";
import { UserService } from "./interfaces/user-service.interface";
import { UserRepository } from "../data/repositories/interfaces/user-repository.interface";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository.interface";
import { RefreshTokenRepository } from "../data/repositories/interfaces/refresh-token-repository.interface";

import { UserAlreadyExists } from "../errors/repository/user-already-exists.error";
import { UserNotFoundError } from "../errors/repository/user-not-found.error";

// import { UserPasswordUpdateDto } from "../dtos/user/user-password-update.dto";
import { UserDetails } from "../dtos/user-details.dto";
import { Tokens, AuthCredentials } from "../dtos";
import {
  AccessTokenEntity,
  RefreshTokenEntity,
  UserEntity,
} from "../data/entities";
import { TokenOptions } from "../data/repositories/interfaces/token-options.interface";

export class CoreUserService implements UserService {
  private readonly _context;
  private readonly _userRepository;
  private readonly _accessTokenRepository;
  private readonly _refreshTokenRepository;

  constructor(container: {
    postgresContext: PostgresContext;
    userRepository: UserRepository;
    accessTokenRepository: AccessTokenRepository;
    refreshTokenRepository: RefreshTokenRepository;
  }) {
    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._accessTokenRepository = container.accessTokenRepository;
    this._refreshTokenRepository = container.refreshTokenRepository;
  }

  /**
   * Return Boolean indicating whether the user exists.
   * @param email
   * @returns
   */
  private isUserExistsByEmail = async (email: string) => {
    return await this._userRepository.existsByEmail(email);
  };

  /**
   * Returns user, if user exists else returns null.
   * @param email
   * @returns
   */
  private getUserByEmail = async (email: string) => {
    return await this._userRepository.findByEmail(email);
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
  private createAccessToken = (user: UserDetails, options: TokenOptions) => {
    const { id, email, isEmailVerified } = user;
    const { exp, jwtid } = options;

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
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newAccessToken = new AccessTokenEntity();
    newAccessToken.id = jwtid;
    newAccessToken.userId = id;
    newAccessToken.tokenValue = Token.create(payload, secret);
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
    const payload = {
      id: userId,
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
    newRefreshToken.tokenValue = Token.create(payload, secret);
    newRefreshToken.expirationAt = new Date(exp * 1000);

    return newRefreshToken;
  };

  /**
   * Creates a new user, accessToken, refreshToken, and profile.
   * @param user
   * @returns
   */
  createUser = async (
    credentials: AuthCredentials,
  ): Promise<ServiceResponse<Tokens>> => {
    const { email, password } = credentials;

    // Check if the user already exists
    const isUserExists = await this.isUserExistsByEmail(email);
    if (isUserExists) {
      throw new UserAlreadyExists();
    }

    // Hash the password and create a new user
    const { hash, salt } = await Hash.create(password);
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.passwordHash = hash;
    newUser.passwordSalt = salt;

    // Transaction to save user, accessToken, and refreshToken
    const result = await this._context.transaction(async (queryRunner) => {
      const savedUser = await this._userRepository.save(newUser, {
        queryRunner,
      });

      const userDetails = new UserDetails({
        id: savedUser.id,
        email: savedUser.email,
        isEmailVerified: savedUser.isEmailVerified,
        createdAt: savedUser.createdAt,
      });

      // Create and save access token
      const newAccessToken = this.createAccessToken(userDetails, {
        exp: this.generateTime(1),
        jwtid: this.generateId(),
      });
      await this._accessTokenRepository.save(newAccessToken, { queryRunner });

      // Create and save refresh token
      const newRefreshToken = this.createRefreshToken(savedUser.id, {
        exp: this.generateTime(60),
        jwtid: this.generateId(),
      });
      await this._refreshTokenRepository.save(newRefreshToken, {
        queryRunner,
      });

      return {
        newAccessToken: newAccessToken.tokenValue,
        newRefreshToken: newRefreshToken.tokenValue,
      };
    });

    return new ServiceResponse({
      data: {
        accessToken: result!.newAccessToken,
        refreshToken: result!.newRefreshToken,
      },
    });
  };

  /**
   * Authenticates the current user with provided credentials
   * @param user
   */
  authenticate = async (
    credentials: AuthCredentials,
  ): Promise<ServiceResponse<Tokens>> => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { passwordHash, passwordSalt } = user;
    const isHashValid = await Hash.verify(passwordHash, passwordSalt, password);

    if (!isHashValid) {
      throw new UnauthorizedError();
    }

    const result = await this._context.transaction(async (queryRunner) => {
      const userDetail = new UserDetails({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        isEmailVerified: user.isEmailVerified,
      });

      const newAccessToken = this.createAccessToken(userDetail, {
        exp: this.generateTime(1),
        jwtid: this.generateId(),
      });
      await this._accessTokenRepository.save(newAccessToken, { queryRunner });

      // create refresh token
      const newRefreshToken = this.createRefreshToken(user.id, {
        exp: this.generateTime(60),
        jwtid: this.generateId(),
      });

      // save refresh token
      await this._refreshTokenRepository.save(newRefreshToken, { queryRunner });

      return {
        newAccessToken: newAccessToken.tokenValue,
        newRefreshToken: newRefreshToken.tokenValue,
      };
    });

    return new ServiceResponse({
      data: {
        accessToken: result!.newAccessToken,
        refreshToken: result!.newRefreshToken,
      },
    });
  };

  // TODO: revokeToken methods
  // removes both access and refresh tokens from the database

  // TODO: refresh tokens
  refreshToken = async (token: Tokens): Promise<ServiceResponse<Tokens>> => {
    const { accessToken, refreshToken } = token;

    const accessTokenValue = Token.decodeAccessToken(accessToken);
    const refreshTokenValue = Token.decodeRefreshToken(refreshToken);

    try {
      Token.verify(refreshToken, process.env.JWT_SECRET!);
    } catch (error) {
      throw new UnauthorizedError();
    } finally {
      if (refreshToken)
        await this._accessTokenRepository.softDelete(accessTokenValue.jwtid);
      if (accessToken)
        await this._refreshTokenRepository.softDelete(refreshTokenValue.jwtid);
    }

    const userDetails = new UserDetails({
      id: accessTokenValue.id,
      email: accessTokenValue.email,
      createdAt: accessTokenValue.createdAt,
      isEmailVerified: accessTokenValue.isEmailVerified,
    });
    const newAccessToken = this.createAccessToken(userDetails, {
      exp: this.generateTime(1),
      jwtid: this.generateId(),
    });
    const newRefreshToken = this.createRefreshToken(userDetails.id, {
      exp: this.generateTime(60),
      jwtid: this.generateId(),
    });

    try {
      await this._context.transaction((queryRunner) => {
        this._accessTokenRepository.save(newAccessToken, { queryRunner });
        this._refreshTokenRepository.save(newRefreshToken, { queryRunner });
      });
    } catch (error) {
      throw new Error("S");
    }

    return new ServiceResponse({
      data: {
        accessToken: newAccessToken.tokenValue,
        refreshToken: newRefreshToken.tokenValue,
      },
    });
  };

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
