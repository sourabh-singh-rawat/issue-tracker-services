import { EmailMessage, NodeMailer } from "@issue-tracker/comm";
import { NatsPublisher } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { Email } from "../data/entities";
import {
  SendEmailOptions,
  UserEmailService,
} from "./interfaces/user-email.service";

export class CoreUserEmailService implements UserEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    private readonly orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private readonly mailer: NodeMailer,
  ) {}

  async sendEmail(payload: SendEmailOptions) {
    const { email, html, userId, manager } = payload;
    const EmailRepo = manager.getRepository(Email);
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
