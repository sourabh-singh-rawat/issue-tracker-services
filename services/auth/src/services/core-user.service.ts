import { Typeorm } from "@issue-tracker/orm";
import { EventBus, UserCreatedPayload } from "@issue-tracker/event-bus";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { UserCreatedPublisher } from "../events/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../events/publishers/user-updated.publisher";
import {
  AuthCredentials,
  InternalServerError,
  NotFoundError,
  TransactionExecutionError,
  USER_EMAIL_CONFIRMATION_STATUS,
  UnauthorizedError,
  UserAlreadyExists,
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

    const isUserExists = await this.isUserExistsByEmail(email);
    if (isUserExists) throw new UserAlreadyExists();

    const { hash, salt } = await Hash.create(password);

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.passwordHash = hash;
    newUser.passwordSalt = salt;

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
      displayName: savedUserProfile.displayName,
      photoUrl: savedUserProfile.photoUrl,
      emailConfirmationStatus: savedUser.emailConfirmationStatus,
      inviteToken,
    });
  };

  getUserInfoByEmail = async (email: string) => {
    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();

    const userProfile = await this.userProfileRepository.findByUserId(user.id);
    if (!userProfile) throw new UserProfileNotFoundError();

    return {
      userId: user.id,
      email: user.email,
      displayName: userProfile.displayName,
      createdAt: user.createdAt,
      emailConfirmationStatus: user.emailConfirmationStatus,
    };
  };

  update = async (id: string, user: UserEntity) => {
    await this.userRepository.update(id, user);
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
    updatedUser.emailConfirmationStatus =
      USER_EMAIL_CONFIRMATION_STATUS.ACCEPTED;

    await this.userRepository.update(userId, updatedUser);
    await this.userUpdatedPublisher.publish(user);
  };
}
