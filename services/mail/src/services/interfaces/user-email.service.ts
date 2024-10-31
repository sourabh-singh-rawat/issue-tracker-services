import { UserRegisteredPayload } from "@issue-tracker/event-bus";
import { EntityManager } from "typeorm";

export interface SendEmailOptions {
  email: string;
  html: string;
  manager: EntityManager;
}

export interface UserEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
