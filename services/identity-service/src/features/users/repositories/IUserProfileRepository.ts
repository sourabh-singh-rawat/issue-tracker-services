import { EntityManager } from "typeorm";
import { UserProfile } from "@/entities/UserProfile";

export type UserProfileRepositoryOptions = { manager: EntityManager };

export interface IUserProfileRepository {
  save(entity: Partial<UserProfile>, options?: UserProfileRepositoryOptions): Promise<UserProfile>;
  existsById(id: string): Promise<boolean>;
  softDelete(id: string, options?: UserProfileRepositoryOptions): Promise<void>;
  findById(id: string): Promise<UserProfile | null>;
  findByUserId(userId: string): Promise<UserProfile | null>;
}
