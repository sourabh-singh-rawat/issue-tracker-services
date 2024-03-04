export interface UserCreatedPayload {
  userId: string;
  email: string;
  defaultWorkspaceId: string;
  isEmailVerified: boolean;
  displayName: string;
  photoUrl?: string;
  inviteToken?: string;
}
