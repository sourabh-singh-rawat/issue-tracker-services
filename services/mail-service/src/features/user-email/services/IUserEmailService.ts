import { EntityManager } from "typeorm";

export interface SendEmailOptions {
  userId: string;
  email: string;
  manager: EntityManager;
}

export interface IUserEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
