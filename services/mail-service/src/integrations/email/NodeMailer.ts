import type { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { EmailMessage, IMailer } from "@/integrations/email/IMailer";

export class NodeMailer implements IMailer {
  constructor(private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>) {}

  send = async (sender: string, receiver: string, message: EmailMessage) => {
    const options = {
      from: sender,
      to: [receiver],
      subject: message.title,
      text: message.text,
      html: message.html,
    };

    await this.transporter.sendMail(options);
  };
}
