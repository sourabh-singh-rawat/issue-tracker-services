export interface UserDetails {
  userId: string;
  email: string;
  displayName?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  photoUrl?: string;
  description?: string;
}
