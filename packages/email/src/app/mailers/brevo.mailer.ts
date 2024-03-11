import { NodeMailer } from "@sourabhrawatcc/core-utils";
import nodemailer from "nodemailer";

export const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
});

export const brevoMailer = new NodeMailer(brevoTransporter);
