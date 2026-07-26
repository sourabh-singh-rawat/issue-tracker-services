import nodemailer from "nodemailer";
import { env } from "@/bootstrap/env";
import { NodeMailer } from "@/integrations/email";

const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: env.BREVO_EMAIL, pass: env.BREVO_SECRET },
});

export const mailer = new NodeMailer(brevoTransporter);
