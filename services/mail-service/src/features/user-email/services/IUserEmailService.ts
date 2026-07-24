import { EntityManager } from "typeorm";

export interface SendEmailOptions {
  userId: string;
  email: string;
  html: string;
  manager: EntityManager;
}

export interface IUserEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
