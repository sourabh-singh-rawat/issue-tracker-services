import { UserEmailConfirmationStatus } from "@issue-tracker/common";

export interface UserUpdatedPayload {
  id: string;
  version: number;
  emailConfirmationStatus: UserEmailConfirmationStatus;
}
