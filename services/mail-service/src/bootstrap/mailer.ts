import { NodeMailer } from "@pine/comm";
import nodemailer from "nodemailer";

const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
});

export const mailer = new NodeMailer(brevoTransporter);
