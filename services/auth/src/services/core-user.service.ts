import { Typeorm } from "@issue-tracker/orm";
import { EventBus } from "@issue-tracker/event-bus";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { UserRegisteredPublisher } from "../events/publishers/user-registered.publisher";
import { UserEmailVerifiedPublisher } from "../events/publishers/user-email-verified.publisher";
import {
  AuthCredentials,
  EMAIL_VERIFICATION_STATUS,
  EMAIL_VERIFICATION_TOKEN_STATUS,
  EmailVerificationTokenPayload,
  InternalServerError,
  NotFoundError,
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
import { EmailVerificationTokenRepository } from "../data/repositories/interfaces/email-verification.repository";
import { EmailVerificationTokenEntity } from "../data/entities/email-verification-token.entity";
import { v4 } from "uuid";

export class CoreUserService implements UserService {
  constructor(
    private readonly orm: Typeorm,
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly emailVerificationTokenRepository: EmailVerificationTokenRepository,
    private readonly userRegisteredPublisher: UserRegisteredPublisher,
    private readonly userEmailVerifiedPublisher: UserEmailVerifiedPublisher,
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
    await this.orm.transaction(queryRunner, async (queryRunner) => {
      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const userId = savedUser.id;

      const newUserProfile = new UserProfileEntity();
      newUserProfile.userId = userId;
      newUserProfile.displayName = displayName;

      const savedUserProfile = await this.userProfileRepository.save(
        newUserProfile,
        { queryRunner },
      );

      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 86400;
      const tokenId = v4();
      const emailVerificationToken =
        JwtToken.create<EmailVerificationTokenPayload>(
          {
            sub: "@issue-tracker/auth",
            iss: "@issue-tracker/auth",
            aud: "@issue-tracker/mail",
            iat,
            exp,
            userId,
            tokenId,
          },
          process.env.JWT_SECRET!,
        );

      const newEmailVerificationToken = new EmailVerificationTokenEntity();
      newEmailVerificationToken.id = tokenId;
      newEmailVerificationToken.token = emailVerificationToken;
      newEmailVerificationToken.expiresAt = new Date(exp * 1000);
      newEmailVerificationToken.userId = userId;

      await this.emailVerificationTokenRepository.save(
        newEmailVerificationToken,
        { queryRunner },
      );

      await this.userRegisteredPublisher.publish({
        emailVerificationToken: emailVerificationToken,
        userId,
        email: savedUser.email,
        displayName: savedUserProfile.displayName,
        photoUrl: savedUserProfile.photoUrl,
        emailVerificationStatus: savedUser.emailVerificationStatus,
        emailVerificationTokenExp: exp,
        inviteToken,
      });
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
      emailVerificationStatus: user.emailVerificationStatus,
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

  verifyEmail = async (userId: string, token: string) => {
    let verifiedToken: any;

    try {
      verifiedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new InternalServerError("Token verification failed");
    }
    const { tokenId } = verifiedToken;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const userProfile = await this.userProfileRepository.findByUserId(userId);
    if (!userProfile) throw new UserProfileNotFoundError();

    const emailVerificationToken =
      await this.emailVerificationTokenRepository.findOne(tokenId);
    if (!emailVerificationToken) throw new InternalServerError("Invalid Token");

    if (emailVerificationToken.status !== EMAIL_VERIFICATION_TOKEN_STATUS.VALID)
      throw new Error("Invalid Token");

    const queryRunner = this.orm.createQueryRunner();
    this.orm.transaction(queryRunner, async (queryRunner) => {
      user.emailVerificationStatus = EMAIL_VERIFICATION_STATUS.VERIFIED;
      emailVerificationToken.status = EMAIL_VERIFICATION_TOKEN_STATUS.USED;

      await this.userRepository.update(userId, user, { queryRunner });
      await this.emailVerificationTokenRepository.update(
        tokenId,
        emailVerificationToken,
        { queryRunner },
      );
      await this.userEmailVerifiedPublisher.publish({
        displayName: userProfile.displayName,
        email: user.email,
        emailVerificationStatus: user.emailVerificationStatus,
        userId,
      });
    });
  };
}
