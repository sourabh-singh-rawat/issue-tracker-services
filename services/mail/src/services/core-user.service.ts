import { Typeorm } from "@issue-tracker/orm";
import { UserService } from "./interfaces/user.service";
import { dataSource } from "..";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserRegisteredPayload } from "@issue-tracker/event-bus";
import { UserEntity } from "../data/entities";
import { ConfirmationEmailEntity } from "../data/entities/confirmation-email.entity";
import { CONFIRMATION_EMAIL_STATUS } from "@issue-tracker/common";
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

  createUserAndEmailConfirmation = async (payload: UserRegisteredPayload) => {
    const queryRunner = dataSource.createQueryRunner();

    await this.orm.transaction(queryRunner, async (queryRunner) => {
      const {
        userId,
        email,
        photoUrl,
        displayName,
        emailVerificationToken,
        emailVerificationTokenExp,
      } = payload;

      const newUser = new UserEntity();
      newUser.id = userId;
      newUser.email = email;
      newUser.photoUrl = photoUrl;
      newUser.displayName = displayName;

      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const newConfirmationEmail = new ConfirmationEmailEntity();
      newConfirmationEmail.userId = userId;
      newConfirmationEmail.emailAddress = email;
      newConfirmationEmail.emailVerificationToken = emailVerificationToken;
      newConfirmationEmail.expiresAt = new Date(
        emailVerificationTokenExp * 1000,
      );

      const savedEmailConfirmation =
        await this.userEmailConfirmationRepository.save(newConfirmationEmail, {
          queryRunner,
        });

      await this.emailService.sendUserEmailConfirmation(savedEmailConfirmation);
      const sentAt = Math.floor(Date.now() / 1000);
      savedEmailConfirmation.status = CONFIRMATION_EMAIL_STATUS.SENT;
      const id = savedEmailConfirmation.id;
      await this.userEmailConfirmationRepository.update(
        id,
        savedEmailConfirmation,
        { queryRunner },
      );

      await this.userRepository.updateUser(userId, savedUser);
      await this.userEmailConfirmationSentPublisher.publish({
        userId: id,
        email,
        sentAt,
      });
    });
  };
}
