import type { DbClient } from "@/db";

export interface SendEmailOptions {
  userId: string;
  email: string;
  tx: DbClient;
}

export interface IUserEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
