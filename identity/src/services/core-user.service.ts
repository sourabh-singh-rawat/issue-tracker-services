import { v4 } from "uuid";
import {
  AuthCredentials,
  Hash,
  ServiceResponse,
  Token,
  Tokens,
  UnauthorizedError,
  UserAlreadyExists,
  UserDetails,
  UserNotFoundError,
  UserProfileNotFoundError,
} from "@sourabhrawatcc/core-utils";

import { Services } from "../app/container.config";
import { UserService } from "./interfaces/user-service";
import { TokenOptions } from "../data/repositories/interfaces/token-options";
import {
  AccessTokenEntity,
  RefreshTokenEntity,
  UserEntity,
  UserProfileEntity,
} from "../data/entities";

export class CoreUserService implements UserService {
  private readonly _context;
  private readonly _userRepository;
  private readonly _accessTokenRepository;
  private readonly _refreshTokenRepository;
  private readonly _userProfileRepository;

  constructor(container: Services) {
    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._accessTokenRepository = container.accessTokenRepository;
    this._refreshTokenRepository = container.refreshTokenRepository;
    this._userProfileRepository = container.userProfileRepository;
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

  private getUserById = async (id: string) => {
    return await this._userRepository.findById(id);
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

  private getUserProfileByUserId = async (id: string) => {
    return await this._userProfileRepository.findUserProfileByUserId(id);
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

    const payload = {
      ...userDetails,
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
      iss: "identity-service",
      aud: "client",
      sub: userDetails.id,
      exp,
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newAccessToken = new AccessTokenEntity();
    newAccessToken.id = jwtid;
    newAccessToken.userId = userDetails.id;
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
    const { email, password, displayName } = credentials;

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

      if (!displayName) {
        throw new Error("No display name");
      }
      const newUserProfile = new UserProfileEntity();
      newUserProfile.displayName = displayName;
      newUserProfile.userId = savedUser.id;

      const savedUserProfile = await this._userProfileRepository.save(
        newUserProfile,
        { queryRunner },
      );

      const userDetails = new UserDetails({
        id: savedUser.id,
        email: savedUser.email,
        displayName: savedUserProfile.displayName,
        isEmailVerified: savedUser.isEmailVerified,
        createdAt: savedUser.createdAt,
        photoUrl: savedUserProfile.photoUrl,
        description: savedUserProfile.description,
        defaultWorkspaceId: savedUserProfile.defaultWorkspaceId,
      });

      // Create and save access token
      const newAccessToken = this.createAccessToken(userDetails, {
        exp: this.generateTime(15),
        jwtid: this.generateId(),
      });
      await this._accessTokenRepository.save(newAccessToken, { queryRunner });

      // Create and save refresh token
      const newRefreshToken = this.createRefreshToken(savedUser.id, {
        exp: this.generateTime(60 * 24),
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

    const userProfile = await this.getUserProfileByUserId(user.id);
    if (!userProfile) {
      throw new UserProfileNotFoundError();
    }

    const { passwordHash, passwordSalt } = user;
    const isHashValid = await Hash.verify(passwordHash, passwordSalt, password);

    if (!isHashValid) {
      throw new UnauthorizedError();
    }

    const result = await this._context.transaction(async (queryRunner) => {
      const userDetails = new UserDetails({
        id: user.id,
        email: user.email,
        displayName: userProfile.displayName,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        photoUrl: userProfile.photoUrl,
        description: userProfile.description,
        defaultWorkspaceId: userProfile.defaultWorkspaceId,
      });

      const newAccessToken = this.createAccessToken(userDetails, {
        exp: this.generateTime(15),
        jwtid: this.generateId(),
      });
      await this._accessTokenRepository.save(newAccessToken, { queryRunner });

      // create refresh token
      const newRefreshToken = this.createRefreshToken(user.id, {
        exp: this.generateTime(60 * 24),
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
    const { refreshToken } = token;

    // Verify refresh token's integrity
    try {
      Token.verify(refreshToken, process.env.JWT_SECRET!);
    } catch (error) {
      throw new UnauthorizedError();
    }

    // Check if token exits in database
    const { userId, jwtid } = Token.decodeRefreshToken(refreshToken);
    const isTokenPresent = await this._refreshTokenRepository.existsById(jwtid);

    if (!isTokenPresent) {
      throw new UnauthorizedError();
    }

    // Token is Valid
    // Check if the user exists
    const user = await this.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userProfile = await this.getUserProfileByUserId(userId);

    if (!userProfile) {
      throw new UserProfileNotFoundError();
    }

    const userDetails = new UserDetails({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
      displayName: userProfile.displayName,
      description: userProfile.description,
      photoUrl: userProfile.photoUrl,
      defaultWorkspaceId: userProfile.defaultWorkspaceId,
    });
    const newAccessToken = this.createAccessToken(userDetails, {
      exp: this.generateTime(15),
      jwtid: this.generateId(),
    });
    const newRefreshToken = this.createRefreshToken(userDetails.id, {
      exp: this.generateTime(60 * 24),
      jwtid: this.generateId(),
    });

    await this._context.transaction((queryRunner) => {
      this._accessTokenRepository.save(newAccessToken, { queryRunner });
      this._refreshTokenRepository.save(newRefreshToken, { queryRunner });
    });

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
