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

export interface IProfileService {
  create(options: CreateProfileOptions): Promise<void>;
  getByIdentityId(identityId: string): Promise<Profile>;
  updateName(options: UpdateNameOptions): Promise<Profile>;
  updateGender(options: UpdateGenderOptions): Promise<Profile>;
  delete(options: DeleteProfileOptions): Promise<void>;
}
