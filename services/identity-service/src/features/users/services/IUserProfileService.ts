import type { DbClient, UserProfile } from "@/db";

export interface CreateUserProfileOptions {
  tx: DbClient;
  userId: string;
  displayName: string;
  description?: string;
}

export interface IUserProfileService {
  createUserProfile(options: CreateUserProfileOptions): Promise<void>;
  getUserProfileByUserId(userId: string): Promise<UserProfile>;
  getUserProfileWithEmail(email: string): Promise<{
    userId: string;
    email: string;
    idpId?: string | null;
    idpProvider?: string | null;
    displayName: string;
    description?: string | null;
    photoUrl?: string | null;
    createdAt: Date;
  }>;
}
