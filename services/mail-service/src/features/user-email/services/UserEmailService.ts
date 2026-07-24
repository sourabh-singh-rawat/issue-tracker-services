import { EmailMessage, Mailer } from "@pine/comm";
import { Publisher, Subjects } from "@pine/event-bus";
import { Typeorm } from "@pine/orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { Email } from "@/entities";
import { IUserEmailService, SendEmailOptions } from "./IUserEmailService";

@injectable()
export class UserEmailService implements IUserEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    @inject(TYPES.Orm)
    private readonly orm: Typeorm,
    @inject(TYPES.Publisher)
    private readonly publisher: Publisher<Subjects>,
    @inject(TYPES.Mailer)
    private readonly mailer: Mailer,
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
