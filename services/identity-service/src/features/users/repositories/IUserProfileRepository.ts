import type { UserProfile } from "@/db";
import type { DbClient } from "@/db";

export type UserProfileRepositoryOptions = { tx: DbClient };

export interface IUserProfileRepository {
  save(
    entity: Partial<UserProfile> & { userId: string; displayName: string },
    options?: UserProfileRepositoryOptions,
  ): Promise<UserProfile>;
  update(
    id: string,
    entity: Partial<Pick<UserProfile, "displayName" | "description" | "photoUrl" | "deletedAt">>,
    options?: UserProfileRepositoryOptions,
  ): Promise<UserProfile>;
  existsById(id: string): Promise<boolean>;
  softDelete(id: string, options?: UserProfileRepositoryOptions): Promise<void>;
  findById(id: string): Promise<UserProfile | null>;
  findByUserId(
    userId: string,
    options?: UserProfileRepositoryOptions,
  ): Promise<UserProfile | null>;
}
