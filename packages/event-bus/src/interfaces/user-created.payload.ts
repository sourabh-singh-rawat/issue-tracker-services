import { UserEmailConfirmationStatus } from "@issue-tracker/common";

export interface UserCreatedPayload {
  userId: string;
  email: string;
  emailConfirmationStatus: UserEmailConfirmationStatus;
  displayName: string;
  photoUrl?: string;
  inviteToken?: string;
}
