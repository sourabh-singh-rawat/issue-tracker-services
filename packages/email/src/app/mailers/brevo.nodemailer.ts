import {
  EmailMessage,
  JwtToken,
  NodeMailer,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
});

export const brevoNodeMailer = new NodeMailer(brevoTransporter);
