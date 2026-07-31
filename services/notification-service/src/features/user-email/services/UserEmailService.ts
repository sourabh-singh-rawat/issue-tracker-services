import { EMAIL_STATUS, EMAIL_TYPE } from "@pine/common";
import { createCloudEvent, type IPublisher, UserConfirmationEmailSentEvent } from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IEmailRepository } from "@/features/user-email/repositories";
import type { EmailMessage, IMailer } from "@/integrations/email";
import type { IUserEmailService, SendEmailOptions } from "./IUserEmailService";

@injectable()
export class UserEmailService implements IUserEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    @inject(TYPES.EmailRepository)
    private readonly emailRepository: IEmailRepository,
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
    @inject(TYPES.Mailer)
    private readonly mailer: IMailer,
  ) {}

  private buildRegistrationHtml(email: string) {
    return `
      <body style="font-family: Arial, sans-serif; color: #333333; line-height: 1.6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; background-color: #ffffff;">
          <tr>
            <td style="text-align: center;">
              <h4 style="font-size: 1.2em; color: #333333;">Welcome!</h4>
              <p style="font-size: 1em; color: #555555;">
                Your account for <strong>${email}</strong> has been created successfully.
              </p>
              <p style="font-size: 0.9em; color: #888888;">Best regards,<br>Issue tracker</p>
            </td>
          </tr>
        </table>
      </body>
    `;
  }

  async sendEmail(payload: SendEmailOptions) {
    const { email, userId, tx } = payload;
    const html = this.buildRegistrationHtml(email);
    const message: EmailMessage = { title: "Please verify your email", html };

    const savedEmail = await this.emailRepository.save(
      {
        email,
        html,
        type: EMAIL_TYPE.USER_REGISTRATION,
        status: EMAIL_STATUS.PENDING,
      },
      { tx },
    );

    await this.mailer.send(this.senderEmail, email, message);

    await this.emailRepository.update(
      savedEmail.id,
      { status: EMAIL_STATUS.SENT },
      { tx },
    );

    const event = createCloudEvent({
      type: UserConfirmationEmailSentEvent.type,
      version: UserConfirmationEmailSentEvent.version,
      schema: UserConfirmationEmailSentEvent.schema,
      source: "pine/notification-service",
      subject: userId,
      data: {
        userId,
        email,
        sentAt: Date.now(),
      },
    });
    await this.publisher.send(event);
  }
}
