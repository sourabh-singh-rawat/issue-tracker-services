import { UserEmailConfirmationStatus } from "../enums";

export interface UserDetails {
  userId: string;
  email: string;
  emailConfirmationStatus: UserEmailConfirmationStatus;
  displayName?: string;
  createdAt: Date;
  photoUrl?: string;
  description?: string;
}
