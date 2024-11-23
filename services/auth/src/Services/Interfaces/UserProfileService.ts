import { UserDetails } from "@issue-tracker/common";
import { EntityManager } from "typeorm";

export interface ServiceOptions {
  manager: EntityManager;
}

export interface CreateUserProfileOptions extends ServiceOptions {
  userId: string;
  displayName: string;
  description?: string;
}

export interface UpdateDisplayNameOptions extends ServiceOptions {
  userId: string;
  displayName: string;
}

export interface UpdateDescriptionOptions extends ServiceOptions {
  userId: string;
  description: string;
}

export interface UpdatePhotoOptions extends ServiceOptions {
  userId: string;
  buffer: Buffer;
}

export interface UserProfileService {
  createUserProfile(options: CreateUserProfileOptions): Promise<void>;
  getUserProfileWithEmail(email: string): Promise<UserDetails>;
  // getUserProfileWithId(id: string): Promise<string>;
  // updateDisplayName(options: UpdateDisplayNameOptions): Promise<void>;
  // updateDescription(options: UpdateDescriptionOptions): Promise<void>;
  // updatePhoto(options: UpdatePhotoOptions): Promise<void>;
}
