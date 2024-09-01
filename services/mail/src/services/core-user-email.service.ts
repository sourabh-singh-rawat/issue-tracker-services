import { Typeorm } from "@issue-tracker/orm";
import { UserEmailService } from "./interfaces/user-email.service";
import { dataSource } from "..";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { NatsPublisher, UserRegisteredPayload } from "@issue-tracker/event-bus";
import { EmailEntity, UserEntity } from "../data/entities";
import {
  EMAIL_STATUS,
  EMAIL_TYPE,
  UserAlreadyExists,
} from "@issue-tracker/common";
import { EmailRepository } from "../data/repositories/interfaces/email.repository";
import { EmailMessage, NodeMailer } from "@issue-tracker/comm";

export class CoreUserEmailService implements UserEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    private readonly orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private readonly emailRepository: EmailRepository,
    private readonly userRepository: UserRepository,
    private readonly mailer: NodeMailer,
  ) {}

  createUserAndSendRegistrationEmail = async (
    payload: UserRegisteredPayload,
  ) => {
    const {
      userId,
      email: receiverEmail,
      photoUrl,
      displayName,
      emailVerificationToken,
    } = payload;

    const exists = await this.userRepository.existsById(userId);
    if (exists) throw new UserAlreadyExists();

    const queryRunner = dataSource.createQueryRunner();
    await this.orm.transaction(queryRunner, async (queryRunner) => {
      const newUser = new UserEntity();
      newUser.id = userId;
      newUser.email = receiverEmail;
      newUser.photoUrl = photoUrl;
      newUser.displayName = displayName;

      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const message: EmailMessage = {
        title: "Please confirm your email",
        html: `
          <strong>
            <p>Please click this <a href="http://localhost:4001/api/v1/users/${userId}/confirm?confirmationEmail=${emailVerificationToken}">link</a> to confirm your email </p>
          </strong>
        `,
      };
      const email = new EmailEntity();
      email.type = EMAIL_TYPE.USER_REGISTRATION;
      email.senderId = userId;
      email.receiverEmail = receiverEmail;
      email.token = emailVerificationToken;
      email.message = JSON.stringify(message);
      const savedEmail = await this.emailRepository.save(email, {
        queryRunner,
      });

      await this.mailer.send(this.senderEmail, receiverEmail, message);
      const sentAt = Math.floor(Date.now() / 1000);
      savedEmail.status = EMAIL_STATUS.SENT;
      const id = savedEmail.id;
      await this.emailRepository.update(id, savedEmail, { queryRunner });
      await this.userRepository.updateUser(userId, savedUser, { queryRunner });
      await this.publisher.send("user.confirmation-email-sent", {
        userId: id,
        email: receiverEmail,
        sentAt,
      });
    });
  };
}
