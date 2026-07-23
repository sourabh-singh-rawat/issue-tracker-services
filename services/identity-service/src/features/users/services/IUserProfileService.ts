import { ServiceOptions } from "@pine/orm";
import { UserProfile } from "@/entities/UserProfile";

export interface CreateUserProfileOptions extends ServiceOptions {
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
    externalId: string;
    displayName: string;
    description?: string;
    photoUrl?: string;
    createdAt: Date;
  }>;
}
