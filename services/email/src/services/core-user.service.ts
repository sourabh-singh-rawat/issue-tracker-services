import { Typeorm } from "@issue-tracker/orm";
import { UserService } from "./interfaces/user.service";
import { dataSource } from "..";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserCreatedPayload } from "@issue-tracker/event-bus";
import { UserEntity } from "../data/entities";
import { UserEmailConfirmationEntity } from "../data/entities/user-email-confirmation.entity";
import {
  USER_EMAIL_CONFIRMATION_STATUS,
  UserEmailConfirmationToken,
} from "@issue-tracker/common";
import { JwtToken } from "@issue-tracker/security";
import { v4 } from "uuid";
import { UserEmailConfirmationRepository } from "../data/repositories/interfaces/user-email-confirmation.repository";
import { EmailService } from "./interfaces/email.service";
import { UserEmailConfirmationSentPublisher } from "../events/publishers/user-email-confirmation-sent.publisher";

export class CoreUserService implements UserService {
  constructor(
    private readonly orm: Typeorm,
    private readonly userRepository: UserRepository,
    private readonly userEmailConfirmationRepository: UserEmailConfirmationRepository,
    private readonly emailService: EmailService,
    private readonly userEmailConfirmationSentPublisher: UserEmailConfirmationSentPublisher,
  ) {}

  createUserAndEmailConfirmation = async (payload: UserCreatedPayload) => {
    const queryRunner = dataSource.createQueryRunner();

    await this.orm.transaction(queryRunner, async (queryRunner) => {
      const { userId, email, emailConfirmationStatus, displayName, photoUrl } =
        payload;

      const newUser = new UserEntity();
      newUser.id = userId;
      newUser.email = email;
      newUser.emailConfirmationStatus = emailConfirmationStatus;
      newUser.displayName = displayName;
      newUser.photoUrl = photoUrl;

      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const exp = Math.floor(Date.now() / 1000) + 1440 * 60;
      const token = JwtToken.create<UserEmailConfirmationToken>(
        {
          userId,
          aud: userId,
          exp,
          iss: "email-service",
          jwtid: v4(),
          sub: userId,
        },
        process.env.JWT_SECRET!,
      );

      const newUserEmailConfirmation = new UserEmailConfirmationEntity();
      newUserEmailConfirmation.userId = userId;
      newUserEmailConfirmation.email = email;
      newUserEmailConfirmation.status = USER_EMAIL_CONFIRMATION_STATUS.PENDING;
      newUserEmailConfirmation.confirmationToken = token;
      newUserEmailConfirmation.expiresAt = new Date(exp * 1000);

      const savedEmailConfirmation =
        await this.userEmailConfirmationRepository.save(
          newUserEmailConfirmation,
          { queryRunner },
        );

      await this.emailService.sendUserEmailConfirmation(savedEmailConfirmation);
      savedEmailConfirmation.status = USER_EMAIL_CONFIRMATION_STATUS.SENT;
      const id = savedEmailConfirmation.id;
      await this.userEmailConfirmationRepository.update(
        id,
        savedEmailConfirmation,
        { queryRunner },
      );

      savedUser.emailConfirmationStatus = USER_EMAIL_CONFIRMATION_STATUS.SENT;
      await this.userRepository.updateUser(userId, savedUser);
      await this.userEmailConfirmationSentPublisher.publish({
        userId: id,
        token,
        email,
      });
    });
  };
}
