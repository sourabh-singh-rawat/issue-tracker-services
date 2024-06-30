export interface UserCreatedPayload {
  userId: string;
  email: string;
  isEmailVerified: boolean;
  displayName: string;
  photoUrl?: string;
  inviteToken?: string;
}
