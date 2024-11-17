import { Typeorm } from "@issue-tracker/orm";
import {
  SendEmailOptions,
  UserEmailService,
} from "./interfaces/user-email.service";
import { dataSource } from "..";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { NatsPublisher } from "@issue-tracker/event-bus";
import { EmailEntity } from "../data/entities";
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

  async sendEmail(payload: SendEmailOptions) {
    const { email, html, userId, manager } = payload;
    const EmailRepo = manager.getRepository(EmailEntity);
    const message: EmailMessage = { title: "Please verify your email", html };

    const savedEmail = await EmailRepo.save({
      email,
      html,
      type: "User Registration",
    });
    await this.mailer.send(this.senderEmail, email, message);
    savedEmail.status = "Sent";
    await EmailRepo.save(savedEmail);
    await this.publisher.send("user.confirmation-email-sent", {
      userId,
      email,
      sentAt: new Date(),
    });
  }
}
