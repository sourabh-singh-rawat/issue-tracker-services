import type { DbClient, Profile } from "@/db";
import type { ProfileGender } from "@/features/profiles/constants";

export type CreateProfileOptions = {
  tx: DbClient;
  identityId: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  description?: string;
};

export type UpdateNameOptions = {
  identityId: string;
  firstName: string;
  middleName?: string | null;
  lastName?: string | null;
};

export type UpdateGenderOptions = {
  identityId: string;
  gender: ProfileGender;
};

export type DeleteProfileOptions = {
  tx: DbClient;
  identityId: string;
};

export type CreatePhotoUploadRequestOptions = {
  identityId: string;
  authMethod?: "access_token" | "session";
  filename: string;
  contentType: string;
  size: number;
};

export type CreatePhotoUploadRequestResult = {
  uploadRequestId: string;
  url: string;
  headers: Record<string, string>;
  expiresAt: string;
};

export interface IProfileService {
  create(options: CreateProfileOptions): Promise<void>;
  getByIdentityId(identityId: string): Promise<Profile>;
  updateName(options: UpdateNameOptions): Promise<Profile>;
  updateGender(options: UpdateGenderOptions): Promise<Profile>;
  delete(options: DeleteProfileOptions): Promise<void>;
  createPhotoUploadRequest(
    options: CreatePhotoUploadRequestOptions,
  ): Promise<CreatePhotoUploadRequestResult>;
}
