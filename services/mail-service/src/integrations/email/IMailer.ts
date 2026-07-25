export interface EmailMessage {
  title: string;
  html: string;
  text?: string;
}

export interface IMailer {
  send(sender: string, receiver: string, message: EmailMessage): Promise<void>;
}
