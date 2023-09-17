import {
  Hash,
  AuthCredentials,
  UserAlreadyExists,
  UserNotFoundError,
  UnauthorizedError,
  UserRegistrationData,
  UserProfileNotFoundError,
  UserDetails,
} from "@sourabhrawatcc/core-utils";
import { UserService } from "./interface/user.service";
import { Services } from "../app/container.config";
import { UserEntity } from "../data/entities/user.entity";
import { UserProfileEntity } from "../data/entities/user-profile.entity";
import { UserCreatedPublisher } from "../messages/publishers/user-created.publisher";
import { messageServer } from "../app/message-system.config";

export class CoreUserService implements UserService {
  private readonly _context;
  private readonly _userRepository;
  private readonly _userProfileRepository;

  constructor(container: Services) {
    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._userProfileRepository = container.userProfileRepository;
  }

  /**
   * Returns user, if user exists else returns null.
   * @param email
   * @returns
   */
  private getUserByEmail = async (email: string) => {
    return await this._userRepository.findByEmail(email);
  };

  /**
   * Return Boolean indicating whether the user exists.
   * @param email
   * @returns
   */
  private isUserExistsByEmail = async (email: string) => {
    return await this._userRepository.existsByEmail(email);
  };

  /**
   * Creates a new user with provided credentials
   * @param credentials
   */
  createUser = async (
    userRegistrationData: UserRegistrationData,
  ): Promise<void> => {
    const { email, password, displayName } = userRegistrationData;

    // Check if the user already exists
    const isUserExists = await this.isUserExistsByEmail(email);
    if (isUserExists) throw new UserAlreadyExists();

    // Hash the password and create a new user
    const { hash, salt } = await Hash.create(password);

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.passwordHash = hash;
    newUser.passwordSalt = salt;

    // Create user and their profile
    const savedUser = await this._context.transaction(async (queryRunner) => {
      const savedUser = await this._userRepository.save(newUser, {
        queryRunner,
      });

      const newUserProfile = new UserProfileEntity();
      newUserProfile.userId = savedUser.id;
      newUserProfile.displayName = displayName;

      await this._userProfileRepository.save(newUserProfile, { queryRunner });

      return savedUser;
    });

    const userCreatedPublisher = new UserCreatedPublisher(
      messageServer.natsClient,
    );
    await userCreatedPublisher.publish({
      userId: savedUser.id,
      email: savedUser.email,
    });
  };

  /**
   * Verifies user password with provided credentials
   * @throws Error if verification fails
   * @returns nothing
   */
  verifyPassword = async (credentials: AuthCredentials) => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();

    const { passwordHash, passwordSalt } = user;
    const isHashValid = await Hash.verify(passwordHash, passwordSalt, password);

    if (!isHashValid) throw new UnauthorizedError();
  };

  /**
   * Gets information about the existing user using their email.
   * @returns user details
   */
  getUserInfoByEmail = async (email: string) => {
    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();

    const userProfile = await this._userProfileRepository.findByUserId(user.id);
    if (!userProfile) throw new UserProfileNotFoundError();

    const userDetails = new UserDetails({
      id: user.id,
      email: user.email,
      displayName: userProfile.displayName,
      defaultWorkspaceId: userProfile.defaultWorkspaceId,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
    });

    return userDetails;
  };
}
