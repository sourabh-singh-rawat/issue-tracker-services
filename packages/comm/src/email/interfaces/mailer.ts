import { EmailMessage } from "..";

export interface Mailer {
  send(sender: string, receiver: string, message: EmailMessage): Promise<void>;
}
