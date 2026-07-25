import nodemailer from "nodemailer";
import { NodeMailer } from "@/integrations/email";

const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
});

export const mailer = new NodeMailer(brevoTransporter);
