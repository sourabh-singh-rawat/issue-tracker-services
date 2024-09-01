export type MessagePayload = string | object | null;

export interface Publisher<Subjects> {
  send(subject: Subjects, message: MessagePayload): Promise<void>;
}
