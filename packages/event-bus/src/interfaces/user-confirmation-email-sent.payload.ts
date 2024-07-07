export interface UserEmailConfirmationSentPayload {
  userId: string;
  email: string;
  token?: string;
}
