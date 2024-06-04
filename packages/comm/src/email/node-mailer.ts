import { Transporter } from "nodemailer";
import { Mailer } from "./interfaces/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface EmailMessage {
  title: string;
  html: string;
  text?: string;
}

export class NodeMailer implements Mailer {
  constructor(
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

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
