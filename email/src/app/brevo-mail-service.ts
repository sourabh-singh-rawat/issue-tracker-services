import { EmailMessage, MailService } from "@sourabhrawatcc/core-utils";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "nino.chan.cc@gmail.com",
    pass: "HX8r6pItPxCcN53Q",
  },
});

export class BrevoMailService extends MailService {
  constructor(
    readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {
    super(transporter);
  }

  send = async (email: string, message: EmailMessage) => {
    if (!this.sender) {
      throw new Error("Please add a sender using setSender method");
    }

    const options = {
      from: `${this.sender.name},  ${this.sender.email}`, // sender address
      to: [email], // list of receivers
      subject: message.title, // Subject line
      text: message.text, // plain text body
      html: message.html, // html body
    };

    return await this.transporter.sendMail(options);
  };

  sentWorkspaceInvite = async (receiver: string) => {
    if (!this.sender) {
      throw new Error("Please add a sender using setSender method");
    }

    const message: EmailMessage = {
      title: `You are invited to join workspace by ${this.sender.name}`,
      html: "Click the link below to join this workspace",
    };

    await this.send(receiver, message);
  };
}
