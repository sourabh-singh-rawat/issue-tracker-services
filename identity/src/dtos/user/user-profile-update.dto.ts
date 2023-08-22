export interface UserProfileUpdateDTO {
  userId: string;
  displayName: string;
  description: string | null;
  photoUrl: string | null;
  defaultWorkspaceId: string | null;
}
