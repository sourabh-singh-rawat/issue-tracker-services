import {
  Hash,
  AuthCredentials,
  UserAlreadyExists,
  UserNotFoundError,
  UnauthorizedError,
  UserRegistrationData,
  UserProfileNotFoundError,
  UserDetails,
  TransactionExecutionError,
  DatabaseService,
  MessageService,
} from "@sourabhrawatcc/core-utils";
import { UserService } from "./interface/user.service";
import { UserEntity } from "../data/entities/user.entity";
import { UserProfileEntity } from "../data/entities/user-profile.entity";
import { UserCreatedPublisher } from "../messages/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../messages/publishers/user-updated.publisher";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";

export class CoreUserService implements UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly messageService: MessageService,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly userCreatedPublisher: UserCreatedPublisher,
    private readonly userUpdatedPublisher: UserUpdatedPublisher,
  ) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

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
  createUser = async (userRegistrationData: UserRegistrationData) => {
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
    newUser.defaultWorkspaceName = "Default Workspace";

    // Create user and their profile
    const queryRunner = this.databaseService.createQueryRunner();
    const savedUser = await this.databaseService.transaction(
      queryRunner,
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

    if (!savedUser) {
      throw new TransactionExecutionError("User creation failed");
    }

    this.userCreatedPublisher.publish({
      userId: savedUser.id,
      email: savedUser.email,
      isEmailVerified: savedUser.isEmailVerified,
      defaultWorkspaceId: savedUser.defaultWorkspaceId,
    });
  };

  setDefaultWorkspace = async (userId: string, id: string, name: string) => {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = id;
    updatedUser.defaultWorkspaceName = name;

    await this.userRepository.update(userId, updatedUser);

    // publish user updated
    this.userUpdatedPublisher.publish({
      userId,
      defaultWorkspaceId: id,
      version: user.version,
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
      userId: user.id,
      email: user.email,
      displayName: userProfile.displayName,
      defaultWorkspaceId: user.defaultWorkspaceId,
      defaultWorkspaceName: user.defaultWorkspaceName,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
    });

    return userDetails;
  };
}
