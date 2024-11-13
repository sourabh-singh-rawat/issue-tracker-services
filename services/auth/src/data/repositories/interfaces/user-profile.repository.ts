import { Repository } from "@issue-tracker/orm";
import { UserProfile } from "../../entities/UserProfile";

export interface UserProfileRepository extends Repository<UserProfile> {
  findByUserId(userId: string): Promise<UserProfile | null>;
}
