import { UserRegisteredPayload } from "@issue-tracker/event-bus";
import { EntityManager } from "typeorm";

export interface SendEmailOptions {
  userId: string;
  email: string;
  html: string;
  manager: EntityManager;
}

export interface UserEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
