import { Typeorm } from "@issue-tracker/orm";
import {
  EventBus,
  UserCreatedPayload,
  UserUpdatedPayload,
} from "@issue-tracker/event-bus";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { UserCreatedPublisher } from "../events/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../events/publishers/user-updated.publisher";
import {
  AuthCredentials,
  InternalServerError,
  NotFoundError,
  TransactionExecutionError,
  UnauthorizedError,
  UserAlreadyExists,
  UserDetails,
  UserNotFoundError,
  UserProfileNotFoundError,
  UserRegistrationData,
} from "@issue-tracker/common";
import { Hash, JwtToken } from "@issue-tracker/security";
import { UserEntity } from "../data/entities";
import { UserService } from "./interfaces/user.service";
import { UserProfileEntity } from "../data/entities/user-profile.entity";

export class CoreUserService implements UserService {
  constructor(
    private readonly orm: Typeorm,
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly userCreatedPublisher: UserCreatedPublisher,
    private readonly userUpdatedPublisher: UserUpdatedPublisher,
  ) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  private getUserByEmail = async (email: string) => {
    return await this.userRepository.findByEmail(email);
  };

  private isUserExistsByEmail = async (email: string) => {
    return await this.userRepository.existsByEmail(email);
  };

  createUser = async (
    userRegistrationData: UserRegistrationData,
    inviteToken?: string,
  ) => {
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
    const queryRunner = this.orm.createQueryRunner();
    const result = await this.orm.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedUser = await this.userRepository.save(newUser, {
          queryRunner,
        });

        const newUserProfile = new UserProfileEntity();
        newUserProfile.userId = savedUser.id;
        newUserProfile.displayName = displayName;

        const savedUserProfile = await this.userProfileRepository.save(
          newUserProfile,
          { queryRunner },
        );

        return {
          savedUser,
          savedUserProfile,
        };
      },
    );

    if (!result) throw new TransactionExecutionError("User creation failed");

    const { savedUser, savedUserProfile } = result;

    await this.userCreatedPublisher.publish({
      userId: savedUser.id,
      email: savedUser.email,
      isEmailVerified: savedUser.isEmailVerified,
      defaultWorkspaceName: savedUser.defaultWorkspaceName,
      defaultWorkspaceId: savedUser.defaultWorkspaceId,
      displayName: savedUserProfile.displayName,
      photoUrl: savedUserProfile.photoUrl,
      inviteToken,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser = async (user: UserUpdatedPayload) => {
    throw new Error("Method not implemented.");
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
      id: userId,
      defaultWorkspaceId: id,
      version: user.version,
      isEmailVerified: user.isEmailVerified,
    });
  };

  verifyPassword = async (credentials: AuthCredentials) => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();

    const { passwordHash, passwordSalt } = user;

    const isHashValid = await Hash.verify(passwordHash, passwordSalt, password);
    if (!isHashValid) throw new UnauthorizedError();
  };

  verifyEmail = async (token: string) => {
    let verifiedToken: UserCreatedPayload;

    try {
      verifiedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new InternalServerError("Token verification failed");
    }

    const { userId } = verifiedToken;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const updatedUser = new UserEntity();
    updatedUser.isEmailVerified = true;

    await this.userRepository.update(userId, updatedUser);
    await this.userUpdatedPublisher.publish(user);
  };

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
