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
import { RegisteredServices } from "../app/service-container";
import { UserEntity } from "../data/entities/user.entity";
import { UserProfileEntity } from "../data/entities/user-profile.entity";
import { UserCreatedPublisher } from "../messages/publishers/user-created.publisher";
import { messageService } from "../app/message-system.config";

export class CoreUserService implements UserService {
  private readonly databaseService;
  private readonly userRepository;
  private readonly userProfileRepository;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
    this.userRepository = serviceContainer.userRepository;
    this.userProfileRepository = serviceContainer.userProfileRepository;
  }

  /**
   * Returns user, if user exists else returns null.
   * @param email
   * @returns
   */
  private getUserByEmail = async (email: string) => {
    return await this.userRepository.findByEmail(email);
  };

  /**
   * Return Boolean indicating whether the user exists.
   * @param email
   * @returns
   */
  private isUserExistsByEmail = async (email: string) => {
    return await this.userRepository.existsByEmail(email);
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
    const savedUser = await this.databaseService.transaction(
      async (queryRunner) => {
        const savedUser = await this.userRepository.save(newUser, {
          queryRunner,
        });

        const newUserProfile = new UserProfileEntity();
        newUserProfile.userId = savedUser.id;
        newUserProfile.displayName = displayName;

        await this.userProfileRepository.save(newUserProfile, { queryRunner });

        return savedUser;
      },
    );

    const userCreatedPublisher = new UserCreatedPublisher(
      messageService.client,
    );
    await userCreatedPublisher.publish({
      userId: savedUser.id,
      email: savedUser.email,
      defaultWorkspaceId: savedUser.defaultWorkspaceId,
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

    const userProfile = await this.userProfileRepository.findByUserId(user.id);
    if (!userProfile) throw new UserProfileNotFoundError();

    const userDetails = new UserDetails({
      id: user.id,
      email: user.email,
      displayName: userProfile.displayName,
      defaultWorkspaceId: user.defaultWorkspaceId,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
    });

    return userDetails;
  };
}
