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

export class CoreUserService implements UserService {
  private readonly _userRepository;
  private readonly _accessTokenRepository;
  private readonly _context;

  constructor(container: {
    postgresContext: PostgresContext;
    userRepository: UserRepository;
    accessTokenRepository: AccessTokenRepository;
  }) {
    this._userRepository = container.userRepository;
    this._accessTokenRepository = container.accessTokenRepository;
    this._context = container.postgresContext;
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

    const accessToken = await this._context.transaction(async (t) => {
      const savedUser = await this._userRepository.save(newUser, { t });

      // create accessToken
      const userDetail = new UserDetailDto({
        id: savedUser.id,
        email: savedUser.email,
        isEmailVerified: savedUser.isEmailVerified,
        createdAt: savedUser.createdAt,
      });

      const exp = Date.now() + 15 * 60 * 1000;
      const tokenValue = await this.createAccessToken(
        userDetail,
        Math.floor(exp / 1000),
      );

      await this._accessTokenRepository.save(
        {
          userId: savedUser.id,
          tokenValue,
          expirationAt: new Date(exp),
        },
        { t },
      );

      return tokenValue;
    });

    return new ServiceResponseDTO<{
      accessToken: string;
      refreshToken: string;
    }>({
      data: { accessToken, refreshToken: "" },
    });
  };

  /**
   * Creates and saves accessToken in the database
   * @param userDetails
   * @param exp The expiration time in seconds
   * @returns
   */
  private createAccessToken = async (
    user: UserDetailDto,
    exp: number,
  ): Promise<string> => {
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
   * @returns
   */
  createRefreshToken = (userDetails: UserDetailDto): string => {
    const { id } = userDetails;

    const exp = 60 * 60;
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

  // TODO: Create refreshToken and revokeToken methods

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
