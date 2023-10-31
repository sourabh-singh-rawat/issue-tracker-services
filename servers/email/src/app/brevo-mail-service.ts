import {
  EmailMessage,
  JwtToken,
  MailService,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SECRET,
  },
});

export class BrevoMailService implements MailService {
  constructor(
    readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  send = async (sender: string, receiver: string, message: EmailMessage) => {
    const options = {
      from: sender, // sender address
      to: [receiver], // list of receivers
      subject: message.title, // Subject line
      text: message.text, // plain text body
      html: message.html, // html body
    };

    return await this.transporter.sendMail(options);
  };

  sendWorkspaceInvite = async (payload: WorkspaceInvitePayload) => {
    const { senderEmail, receiverEmail, senderName, workspaceId } = payload;

    const token = JwtToken.create(payload, process.env.JWT_SECRET!);

    const message: EmailMessage = {
      title: `You are invited to join workspace by ${senderName}`,
      html: `
        <strong>
          <p>You are invited to Workspace: ${workspaceId} by ${senderName}</p>
        </strong>
        <a href="https://localhost/api/v1/workspaces/${workspaceId}/invite/confirm?inviteToken=${token}">
          Click to Accept Invite
        </a> 
      `,
    };

    await this.send(senderEmail, receiverEmail, message);
  };
}
